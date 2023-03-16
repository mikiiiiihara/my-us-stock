import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosService {
  public async get<T>(url: string) {
    const response = await axios.get<T>(url);
    return await response.data;
  }
}
