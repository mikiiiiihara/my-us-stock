import { Injectable } from '@nestjs/common';
import { MarketPriceRepository } from '@/repositories/market-price/market-price.repository';
import { Dividend } from './types/dividend.type';
import { TickerRepository } from '@/repositories/ticker/ticker.repository';

@Injectable()
export class DividendService {
  constructor(
    private readonly marketPriceRepository: MarketPriceRepository,
    private readonly tickerRepository: TickerRepository,
  ) {}

  // 指定した銘柄の配当情報を取得する
  async getDividendList(userId: string): Promise<Dividend[]> {
    // ユーザーに紐付く保有株式情報を取得
    const tickers = await this.tickerRepository.fetchTickerList(userId);
    // ユーザーが株式を保有していない場合、後続処理を行わない
    if (tickers.length === 0) return [];
    const tickerList: string[] = tickers.map((item) => item.ticker);
    return await Promise.all(
      tickerList.map(async (ticker) => {
        // 該当銘柄の保有株式数を取得
        const quantity = tickers.find(
          (item) => item.ticker === ticker,
        ).quantity;
        const dividend = await this.marketPriceRepository.fetchDividend(ticker);
        return {
          ...dividend,
          quantity,
        };
      }),
    );
  }
}
