import { MarketPriceRepository } from '@/repositories/market-price/market-price.repository';
import { TickerRepository } from '@/repositories/ticker/ticker.repository';
import { Injectable } from '@nestjs/common';
import { CreateTickerInput } from './dto/input/create-ticker.input';
import { UpdateTickerInput } from './dto/input/update-ticker.input';
import { Ticker } from './dto/types/ticker.type';

@Injectable()
export class TickerService {
  constructor(
    private readonly tickerRepository: TickerRepository,
    private readonly marketPriceRepository: MarketPriceRepository,
  ) {}

  async fetchTickerList(user: string): Promise<Ticker[]> {
    // ユーザーに紐付く保有株式情報を取得
    const tickers = await this.tickerRepository.fetchTickerList(user);
    if (tickers.length === 0) return [];
    // 現在のマーケットデータを取得する
    const tickerList = tickers.map((ticker) => ticker.ticker);
    const marketPriceList =
      await this.marketPriceRepository.fetchMarketPriceList(tickerList);
    // 保有株式情報に現在のマーケットデータを付与して返却する
    return tickers.map((ticker) => {
      const marketPrice = marketPriceList.find(
        (marketPrice) => marketPrice.ticker == ticker.ticker,
      );
      return {
        ...ticker,
        ...marketPrice,
      };
    });
  }
  async createTicker(createTickerInput: CreateTickerInput): Promise<Ticker> {
    const newTicker = await this.tickerRepository.createTicker(
      createTickerInput,
    );
    const {
      id,
      ticker,
      getPrice,
      quantity,
      user,
      dividend,
      dividendTime,
      dividendFirstTime,
      sector,
      usdjpy,
    } = newTicker;
    // 現在のマーケットデータも同時に返却する
    const marketPriceList =
      await this.marketPriceRepository.fetchMarketPriceList([ticker]);
    const { currentPrice, priceGets, currentRate } = marketPriceList[0];
    return {
      id,
      ticker,
      getPrice,
      quantity,
      user,
      dividend,
      dividendTime,
      dividendFirstTime,
      sector,
      usdjpy,
      currentPrice,
      priceGets,
      currentRate,
    };
  }

  // 保有株式情報を更新
  async updateTicker(updateTickerInput: UpdateTickerInput): Promise<Ticker> {
    const { id, currentPrice, priceGets, currentRate } = updateTickerInput;
    // 所有株情報の現在価格を更新
    const newTicker = await this.tickerRepository.updateTicker(
      updateTickerInput,
    );
    const {
      ticker,
      getPrice,
      quantity,
      user,
      dividend,
      dividendTime,
      dividendFirstTime,
      sector,
      usdjpy,
    } = newTicker;
    return {
      id,
      ticker,
      getPrice,
      quantity,
      user,
      dividend,
      dividendTime,
      dividendFirstTime,
      sector,
      usdjpy,
      currentPrice,
      priceGets,
      currentRate,
    };
  }

  // 保有株式情報を更新
  async deleteTicker(updateTickerInput: UpdateTickerInput): Promise<Ticker> {
    const { id, currentPrice, priceGets, currentRate } = updateTickerInput;
    //レコード削除
    const selectedTicker = await this.tickerRepository.deleteTicker(id);
    const {
      ticker,
      getPrice,
      quantity,
      user,
      dividend,
      dividendTime,
      dividendFirstTime,
      sector,
      usdjpy,
    } = selectedTicker;
    return {
      id,
      ticker,
      getPrice,
      quantity,
      user,
      dividend,
      dividendTime,
      dividendFirstTime,
      sector,
      usdjpy,
      currentPrice,
      priceGets,
      currentRate,
    };
  }
}
