import axios, { AxiosError, AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { MyLogger } from '@/logger/logger.service';
import safeStringify from 'fast-safe-stringify';

@Injectable()
export class AxiosService {
  constructor(private logger: MyLogger) {}

  public async get<T>(url: string): Promise<T> {
    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        // responseオブジェクトの詳細をログに記録
        const { request, ...others } = response;
        this.logger.log(`AxiosResponse: ${safeStringify(others)}`);
        return response;
      },
      (error: AxiosError) => {
        // errorオブジェクトの詳細をログに記録
        this.logger.error(`AxiosError: ${safeStringify(error.toJSON())}`);
        return Promise.reject(error);
      },
    );

    try {
      const response = await axios.get<T>(url);
      this.logger.log(`response: ${safeStringify(response)}`);
      return response.data;
    } catch (error) {
      this.logger.error(`API Request Failed: ${safeStringify(error)}`);
      if (error.isAxiosError) {
        // Axiosからのエラーをそのまま伝播させる
        throw error;
      } else {
        // その他のエラーの場合、カスタムエラーメッセージを付与して伝播させる
        throw new Error(`API取得に失敗しました: ${error.message}`);
      }
    }
  }
}
