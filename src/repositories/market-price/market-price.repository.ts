import { AxiosService } from '@/axios/axios.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MarketPriceDto } from './dto/market-price.dto';
import { MarketPrice } from './entity/market-price.entity';

@Injectable()
export class MarketPriceRepository {
  constructor(
    private configService: ConfigService,
    private readonly axiosService: AxiosService,
  ) {}

  async fetchMarketPriceList(tickerList: string[]): Promise<MarketPriceDto[]> {
    const baseUrl = this.configService.get<string>('MARKET_PRICE_URL');
    const token = this.configService.get<string>('MARKET_PRICE_TOKEN');
    const url = `${baseUrl}/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${tickerList.toString()}&apiKey=${token}`;
    const response = await this.axiosService.get<MarketPrice>(url);
    const result = response.tickers;
    return result.map((item) => ({
      ticker: item.ticker,
      currentPrice: item.day.c,
      priceGets: item.todaysChange,
      currentRate: item.todaysChangePerc,
    }));
  }
}
