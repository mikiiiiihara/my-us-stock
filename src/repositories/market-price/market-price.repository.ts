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

  async fetchMarketPrice(ticker: string): Promise<MarketPriceDto> {
    const baseUrl = this.configService.get<string>('MARKET_PRICE_URL');
    const token = this.configService.get<string>('MARKET_PRICE_TOKEN');

    const url = `${baseUrl}?symbol=${ticker}&token=${token}`;
    const response = await this.axiosService.get<MarketPrice>(url);
    const marketPrice: MarketPriceDto = {
      currentPrice: response.c,
      priceGets: response.d,
      currentRate: response.dp,
    };
    return marketPrice;
  }
}
