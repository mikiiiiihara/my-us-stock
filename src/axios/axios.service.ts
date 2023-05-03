import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { MyLogger } from '@/logger/logger.service';

@Injectable()
export class AxiosService {
  constructor(private logger: MyLogger) {}
  public async get<T>(url: string) {
    axios.interceptors.request.use((request) => {
      this.logger.log(`Starting Request: ${JSON.stringify(request)}`);
      return request;
    });

    axios.interceptors.response.use((response) => {
      this.logger.log(`Response: ${JSON.stringify(response)}`);
      return response;
    });
    this.logger.log(JSON.stringify(`request url: ${url}`));
    const response = await axios.get<T>(url);
    this.logger.log(`response: ${JSON.stringify(response)}`);
    return await response.data;
  }
}
