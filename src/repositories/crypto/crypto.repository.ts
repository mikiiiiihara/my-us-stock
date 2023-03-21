import { AxiosService } from '@/axios/axios.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CryptoTicker } from './constants';
import { ApiResponse } from './dto/api-response';
import { Crypto } from './dto/crypto.entity';

@Injectable()
export class CryptoRepository {
  constructor(
    private configService: ConfigService,
    private readonly axiosService: AxiosService,
  ) {}
  async fetchCryptoPrice(ticker: CryptoTicker): Promise<Crypto> {
    const url = `${this.configService.get<string>(
      'CRYPTO_URL',
    )}/${ticker}_jpy/ticker`;
    const response = await this.axiosService.get<ApiResponse>(url);
    const crypto = response.data;
    return { name: ticker, price: parseFloat(crypto.last) };
  }
}
