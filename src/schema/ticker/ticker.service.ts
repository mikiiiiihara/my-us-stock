import { MarketPriceRepository } from '@/repositories/market-price/market-price.repository';
import { TickerRepository } from '@/repositories/ticker/ticker.repository';
import { Injectable } from '@nestjs/common';
import { UpdateTickerInput } from './dto/input/update-ticker.input';
import { Ticker } from './dto/types/ticker.type';
import { CreateTickerDto } from './dto/create-ticker.dto';

@Injectable()
export class TickerService {
  constructor(
    private readonly tickerRepository: TickerRepository,
    private readonly marketPriceRepository: MarketPriceRepository,
  ) {}

  async fetchTickerList(userId: string): Promise<Ticker[]> {
    // ユーザーに紐付く保有株式情報を取得
    const tickers = await this.tickerRepository.fetchTickerList(userId);
    if (tickers.length === 0) return [];
    // 現在のマーケットデータを取得する
    const tickerList = tickers.map((ticker) => ticker.ticker);
    const marketPriceList =
      await this.marketPriceRepository.fetchMarketPriceList(tickerList);
    // 保有株式情報に現在のマーケットデータを付与して返却する
    return await Promise.all(
      tickers.map(async (ticker) => {
        // 該当銘柄の保有株式数を取得
        const { dividendTotal } =
          await this.marketPriceRepository.fetchDividend(ticker.ticker);
        const marketPrice = marketPriceList.find(
          (marketPrice) => marketPrice.ticker == ticker.ticker,
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { userId, ...rest } = ticker;
        return {
          ...rest,
          ...marketPrice,
          dividend: dividendTotal,
        };
      }),
    );
  }
  async createTicker(creatTickerDto: CreateTickerDto): Promise<Ticker> {
    const newTicker = await this.tickerRepository.createTicker(creatTickerDto);
    const { id, ticker, getPrice, quantity, sector, usdjpy } = newTicker;
    // 現在のマーケットデータも同時に返却する
    // 価格情報
    const marketPriceList =
      await this.marketPriceRepository.fetchMarketPriceList([ticker]);
    const { currentPrice, priceGets, currentRate } = marketPriceList[0];
    // 配当情報
    const { dividendTotal } = await this.marketPriceRepository.fetchDividend(
      ticker,
    );
    return {
      id,
      ticker,
      dividend: dividendTotal,
      getPrice,
      quantity,
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
    const { ticker, getPrice, quantity, sector, usdjpy } = newTicker;
    // 配当情報
    const { dividendTotal } = await this.marketPriceRepository.fetchDividend(
      ticker,
    );
    return {
      id,
      ticker,
      dividend: dividendTotal,
      getPrice,
      quantity,
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
    const { ticker, getPrice, quantity, sector, usdjpy } = selectedTicker;
    return {
      id,
      ticker,
      getPrice,
      quantity,
      dividend: 0,
      sector,
      usdjpy,
      currentPrice,
      priceGets,
      currentRate,
    };
  }
}
