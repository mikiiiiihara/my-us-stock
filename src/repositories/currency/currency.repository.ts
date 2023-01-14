import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CurrencyPair, Fx } from './dto/fx.dto';

@Injectable()
export class CurrencyRepository {
  constructor(private configService: ConfigService) {}
  async fetchCurrencyPair(): Promise<CurrencyPair[]> {
    const response = await axios.get<Fx>(
      this.configService.get<string>('CURRENCY_URL'),
    );
    const currencyPairList = response.data.quotes;
    return currencyPairList;
  }
}
