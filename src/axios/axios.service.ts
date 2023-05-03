import axios, { AxiosError, AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { MyLogger } from '@/logger/logger.service';
import safeStringify from 'fast-safe-stringify';

@Injectable()
export class AxiosService {
  constructor(private logger: MyLogger) {}
  public async get<T>(url: string) {
    axios.interceptors.request.use((request) => {
      this.logger.log(`AxiosRequest: ${safeStringify(request)}`);
      return request;
    });

    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { request, ...others } = response;
        this.logger.log(`AxiosResponse: ${safeStringify(others)}`);
        return response;
      },
      (error: AxiosError) => {
        this.logger.error(`AxiosError: ${safeStringify(error.toJSON())}`);
        return Promise.reject(error);
      },
    );
    let response: AxiosResponse<T, any>;
    try {
      response = await axios.get<T>(url);
    } catch (error) {
      this.logger.error(safeStringify(error));
      throw new Error('API取得に失敗しました。');
    }
    this.logger.log(`response: ${safeStringify(response)}`);
    return await response.data;
  }
}
