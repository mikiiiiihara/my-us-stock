import { Injectable } from '@nestjs/common';
import { MarketPriceRepository } from 'src/repositories/market-price/market-price.repository';
import { MarketPrice } from './dto/types/market-price.type';

@Injectable()
export class MarketPriceService {
  constructor(private readonly marketPriceRepository: MarketPriceRepository) {}

  // 保有株式の現在の価格を取得する
  async fetchMarketPriceList(tickerList: string[]): Promise<MarketPrice[]> {
    const marketPriceList: MarketPrice[] = [];
    for (const ticker of tickerList) {
      const { currentPrice, priceGets, currentRate } =
        await this.marketPriceRepository.fetchMarketPrice(ticker);
      const marketPrice: MarketPrice = {
        ticker,
        currentPrice,
        priceGets,
        currentRate,
      };
      marketPriceList.push(marketPrice);
    }
    return marketPriceList;
  }
}
