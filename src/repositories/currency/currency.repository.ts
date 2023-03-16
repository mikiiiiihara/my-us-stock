import { AxiosService } from '@/axios/axios.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CurrencyPair, Fx } from './dto/fx.dto';

@Injectable()
export class CurrencyRepository {
  constructor(
    private configService: ConfigService,
    private readonly axiosService: AxiosService,
  ) {}
  async fetchCurrencyPair(): Promise<CurrencyPair[]> {
    const response = await this.axiosService.get<Fx>(
      this.configService.get<string>('CURRENCY_URL'),
    );
    const currencyPairList = response.quotes;
    return currencyPairList;
  }
}
