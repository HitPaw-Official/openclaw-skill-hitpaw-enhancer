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
      timeout: 30000
    });
  }

  async enhancePhoto(params: EnhanceRequest): Promise<EnhanceResponse> {
    const response = await this.client.post('/api/photo-enhancer', params);
    return response.data as EnhanceResponse;
  }

  async checkStatus(jobId: string): Promise<StatusResponse> {
    const response = await this.client.post<StatusResponse>('/api/task-status', { job_id: jobId });
    return response.data;
  }

  async waitForCompletion(jobId: string, maxAttempts = 120, pollInterval = 5): Promise<StatusResponse> {
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

    console.log(`Submitting enhancement job with model: ${model}...`);
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

    console.log(`Job submitted. ID: ${enhanceResp.data.job_id}`);
    console.log(`Coins will be consumed: ${enhanceResp.data.consume_coins}`);

    // Wait for completion
    const status = await this.waitForCompletion(enhanceResp.data.job_id, Math.floor(timeout / pollInterval), pollInterval);

    if (!status.data.res_url) {
      throw new Error('No result URL in status response');
    }

    console.log(`Job completed! Downloading result to ${outputPath}...`);
    await this.downloadResult(status.data.res_url, outputPath);
    console.log('✅ Download complete!');

    return { coins: enhanceResp.data.consume_coins };
  }
}
