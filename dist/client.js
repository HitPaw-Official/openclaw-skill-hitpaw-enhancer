import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
export class HitPawClient {
    client;
    apiKey;
    baseUrl;
    constructor(apiKey, baseUrl = 'https://api-base.hitpaw.com') {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.client = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Apikey': apiKey
            },
            timeout: 60000
        });
    }
    // === PHOTO ENHANCEMENT ===
    async enhancePhoto(params) {
        const response = await this.client.post('/api/photo-enhancer', params);
        return response.data;
    }
    // === VIDEO ENHANCEMENT ===
    async enhanceVideo(params) {
        const response = await this.client.post('/api/video-enhancer', params);
        return response.data;
    }
    // === COMMON ===
    async checkStatus(jobId) {
        const response = await this.client.post('/api/task-status', { job_id: jobId });
        return response.data;
    }
    async waitForCompletion(jobId, maxAttempts = 360, pollInterval = 10) {
        let attempt = 0;
        while (attempt < maxAttempts) {
            const status = await this.checkStatus(jobId);
            console.log(`[Attempt ${attempt + 1}/${maxAttempts}] Status: ${status.data.status}`);
            if (status.data.status === 'COMPLETED') {
                return status;
            }
            if (status.data.status === 'ERROR') {
                throw new Error('Job failed with ERROR status');
            }
            await new Promise(resolve => setTimeout(resolve, pollInterval * 1000));
            attempt++;
        }
        throw new Error(`Job did not complete within ${maxAttempts * pollInterval} seconds`);
    }
    async downloadResult(url, outputPath) {
        const response = await axios.get(url, { responseType: 'stream' });
        await fs.ensureDir(path.dirname(outputPath));
        response.data.pipe(fs.createWriteStream(outputPath));
        await new Promise((resolve, reject) => {
            response.data.on('end', resolve);
            response.data.on('error', reject);
        });
    }
    // === PHOTO HELPER ===
    async enhanceAndDownload(inputUrl, outputPath, options = {}) {
        const { model = 'general_2x', extension = '.jpg', exif = true, dpi, pollInterval = 5, timeout = 300 } = options;
        console.log(`Submitting photo enhancement with model: ${model}...`);
        const enhanceResp = await this.enhancePhoto({
            model_name: model,
            img_url: inputUrl,
            extension,
            exif,
            DPI: dpi
        });
        if (enhanceResp.code !== 200) {
            throw new Error(`Enhance request failed: ${enhanceResp.message}`);
        }
        console.log(`Job ID: ${enhanceResp.data.job_id}`);
        console.log(`Coins: ${enhanceResp.data.consume_coins}`);
        const status = await this.waitForCompletion(enhanceResp.data.job_id, Math.floor(timeout / pollInterval), pollInterval);
        if (!status.data.res_url) {
            throw new Error('No result URL in status response');
        }
        console.log(`Downloading to ${outputPath}...`);
        await this.downloadResult(status.data.res_url, outputPath);
        console.log('✅ Photo enhancement complete!');
        return { coins: enhanceResp.data.consume_coins };
    }
    // === VIDEO HELPER ===
    async enhanceVideoAndDownload(inputUrl, outputPath, options) {
        const DEFAULT_MODEL = 'general_restore_2x';
        const DEFAULT_EXTENSION = '.mp4';
        const { model = DEFAULT_MODEL, resolution, extension = DEFAULT_EXTENSION, original_resolution, pollInterval = 10, timeout = 600 } = options;
        if (!resolution) {
            throw new Error('resolution is required for video enhancement (e.g., [1920, 1080])');
        }
        console.log(`Submitting video enhancement with model: ${model}...`);
        console.log(`Target resolution: ${resolution[0]}x${resolution[1]}`);
        const requestBody = {
            model_name: model,
            video_url: inputUrl,
            resolution,
            extension
        };
        if (original_resolution) {
            requestBody.original_resolution = original_resolution;
        }
        const enhanceResp = await this.enhanceVideo(requestBody);
        if (enhanceResp.code !== 200) {
            throw new Error(`Video enhance failed: ${enhanceResp.message}`);
        }
        console.log(`Job ID: ${enhanceResp.data.job_id}`);
        console.log(`Coins: ${enhanceResp.data.consume_coins}`);
        const status = await this.waitForCompletion(enhanceResp.data.job_id, Math.floor(timeout / pollInterval), pollInterval);
        if (!status.data.res_url) {
            throw new Error('No result URL in status response');
        }
        console.log(`Downloading enhanced video to ${outputPath}...`);
        await this.downloadResult(status.data.res_url, outputPath);
        console.log('✅ Video enhancement complete!');
        return { coins: enhanceResp.data.consume_coins };
    }
}
//# sourceMappingURL=client.js.map