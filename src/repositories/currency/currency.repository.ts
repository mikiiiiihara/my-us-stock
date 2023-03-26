import { AxiosService } from '@/axios/axios.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Fx } from './dto/fx.dto';

@Injectable()
export class CurrencyRepository {
  constructor(
    private configService: ConfigService,
    private readonly axiosService: AxiosService,
  ) {}
  async fetchCurrentUsdJpy(): Promise<number> {
    const response = await this.axiosService.get<Fx>(
      this.configService.get<string>('CURRENCY_URL'),
    );
    const currencyPairList = response.quotes;
    // USDJPYの情報を取得
    const currentUsdJpy = currencyPairList.find(
      (e) => e.currencyPairCode == 'USDJPY',
    ).bid;
    return Number(currentUsdJpy);
  }
}
