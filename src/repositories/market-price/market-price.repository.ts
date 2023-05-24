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

  // 市場価格情報を取得(サービス層からは取得するすべてのティッカーを取得)
  async fetchMarketPriceList(tickerList: string[]): Promise<MarketPriceDto[]> {
    return await Promise.all(
      tickerList.map(async (ticker) => {
        return await this.fetchMarketPrice(ticker);
      }),
    );
  }

  // 市場価格情報を取得(1つ)
  private async fetchMarketPrice(ticker: string): Promise<MarketPriceDto> {
    const baseUrl = this.configService.get<string>('MARKET_PRICE_URL');
    const marketPriceToken =
      this.configService.get<string>('MARKET_PRICE_TOKEN');
    const url = `${baseUrl}?symbol=${ticker}&token=${marketPriceToken}`;
    const response = await this.axiosService.get<MarketPrice>(url);
    const { c, d, dp } = response;
    return {
      ticker,
      currentPrice: c,
      priceGets: d,
      currentRate: dp,
    };
  }
}
