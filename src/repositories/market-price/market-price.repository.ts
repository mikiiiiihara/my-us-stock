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
    const url = `${baseUrl}?symbols=${tickerList.toString()}`;
    const response = await this.axiosService.get<MarketPrice>(url);
    const result = response.quoteResponse.result;
    return result.map((item) => ({
      ticker: item.symbol,
      currentPrice: item.regularMarketPrice,
      priceGets: item.regularMarketChange,
      currentRate: item.regularMarketChangePercent,
    }));
  }
}
