import axios, { AxiosInstance } from 'axios';
import fs from 'fs-extra';
import path from 'path';

export interface EnhanceRequest {
  model_name: string;
  img_url: string;
  extension: string;
  exif?: boolean;
  DPI?: number;
}

export interface VideoEnhanceRequest {
  model_name: string;
  video_url: string;
  resolution: [number, number]; // [width, height] - required!
  extension: string;
  original_resolution?: [number, number];
  fps?: number;
  keep_audio?: boolean;
}

export interface EnhanceResponse {
  code: number;
  message: string;
  data: {
    job_id: string;
    consume_coins: number;
  };
}

export interface StatusResponse {
  code: number;
  message: string;
  data: {
    job_id: string;
    status: 'CONVERTING' | 'COMPLETED' | 'ERROR';
    res_url?: string;
    original_url?: string;
  };
}

export class HitPawClient {
  private client: AxiosInstance;
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl = 'https://api-base.hitpaw.com') {
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
  async enhancePhoto(params: EnhanceRequest): Promise<EnhanceResponse> {
    const response = await this.client.post('/api/photo-enhancer', params);
    return response.data as EnhanceResponse;
  }

  // === VIDEO ENHANCEMENT ===
  async enhanceVideo(params: VideoEnhanceRequest): Promise<EnhanceResponse> {
    const response = await this.client.post('/api/video-enhancer', params);
    return response.data as EnhanceResponse;
  }

  // === COMMON ===
  async checkStatus(jobId: string): Promise<StatusResponse> {
    const response = await this.client.post<StatusResponse>('/api/task-status', { job_id: jobId });
    return response.data;
  }

  async waitForCompletion(jobId: string, maxAttempts = 360, pollInterval = 10): Promise<StatusResponse> {
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
      // CONVERTING - keep waiting
      await new Promise(resolve => setTimeout(resolve, pollInterval * 1000));
      attempt++;
    }
    throw new Error(`Job did not complete within ${maxAttempts * pollInterval} seconds`);
  }

  async downloadResult(url: string, outputPath: string): Promise<void> {
    const response = await axios.get(url, { responseType: 'stream' });
    await fs.ensureDir(path.dirname(outputPath));
    response.data.pipe(fs.createWriteStream(outputPath));
    await new Promise((resolve, reject) => {
      response.data.on('end', resolve);
      response.data.on('error', reject);
    });
  }

  // === PHOTO HELPER ===
  async enhanceAndDownload(
    inputUrl: string,
    outputPath: string,
    options: {
      model?: string;
      extension?: string;
      exif?: boolean;
      dpi?: number;
      pollInterval?: number;
      timeout?: number;
    } = {}
  ): Promise<{ coins: number }> {
    const {
      model = 'general_2x',
      extension = '.jpg',
      exif = true,
      dpi,
      pollInterval = 5,
      timeout = 300
    } = options;

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
  async enhanceVideoAndDownload(
    inputUrl: string,
    outputPath: string,
    options: {
      model?: string;
      resolution?: [number, number]; // [width, height] - required!
      original_resolution?: [number, number];
      extension?: string;
      fps?: number;
      keepAudio?: boolean;
      pollInterval?: number;
      timeout?: number;
    } = {}
  ): Promise<{ coins: number }> {
    const DEFAULT_MODEL = 'general_restore_2x';
    const DEFAULT_RESOLUTION: [number, number] = [1920, 1080];
    const DEFAULT_ORIGINAL_RESOLUTION: [number, number] | undefined = undefined;

    const {
      model = DEFAULT_MODEL,
      resolution = DEFAULT_RESOLUTION,
      extension = '.mp4',
      original_resolution = DEFAULT_ORIGINAL_RESOLUTION,
      fps,
      keepAudio = true,
      pollInterval = 10,
      timeout = 600
    } = options;

    console.log(`Submitting video enhancement with model: ${model}...`);
    console.log(`Target resolution: ${resolution[0]}x${resolution[1]}`);

    const enhanceResp = await this.enhanceVideo({
      model_name: model,
      video_url: inputUrl,
      resolution,
      extension,
      original_resolution,
      fps,
      keep_audio: keepAudio
    });

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