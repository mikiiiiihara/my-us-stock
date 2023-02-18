import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { MarketPriceDto } from './dto/market-price.dto';
import { MarketPrice } from './entity/market-price.entity';

@Injectable()
export class MarketPriceRepository {
  constructor(private configService: ConfigService) {}

  async fetchMarketPrice(ticker: string): Promise<MarketPriceDto> {
    const baseUrl = this.configService.get<string>('MARKET_PRICE_URL');
    const token = this.configService.get<string>('MARKET_PRICE_TOKEN');

    const url = `${baseUrl}?symbol=${ticker}&token=${token}`;
    const response = await axios.get<MarketPrice>(url);
    const data = response.data;
    const marketPrice: MarketPriceDto = {
      currentPrice: data.c,
      priceGets: data.d,
      currentRate: data.dp,
    };
    return marketPrice;
  }
}
