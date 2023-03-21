import { Injectable } from '@nestjs/common';
import { MarketPriceRepository } from '@/repositories/market-price/market-price.repository';
import { MarketPrice } from './dto/types/market-price.type';

@Injectable()
export class MarketPriceService {
  constructor(private readonly marketPriceRepository: MarketPriceRepository) {}

  // 保有株式の現在の価格を取得する
  async fetchMarketPriceList(tickerList: string[]): Promise<MarketPrice[]> {
    const marketPriceList: MarketPrice[] = await Promise.all(
      tickerList.map(async (ticker) => {
        const { currentPrice, priceGets, currentRate } =
          await this.marketPriceRepository.fetchMarketPrice(ticker);
        return {
          ticker,
          currentPrice,
          priceGets,
          currentRate,
        };
      }),
    );
    return marketPriceList;
  }
}
