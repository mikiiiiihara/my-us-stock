import { AxiosService } from '@/axios/axios.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MarketPriceDto } from './dto/market-price.dto';
import { MarketPrice } from './entity/market-price.entity';
import { DividendResponse } from './dto/dividend.response';
import { DividendEntity } from './entity/dividend.entity';
import { format } from 'date-fns';

@Injectable()
export class MarketPriceRepository {
  constructor(
    private configService: ConfigService,
    private readonly axiosService: AxiosService,
  ) {}

  /**
   * 現在の市場価格を取得
   */
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
  /**
   * 指定した銘柄の配当情報を取得する
   */
  async fetchDividend(ticker: string): Promise<DividendEntity> {
    const baseUrl = this.configService.get<string>('MARKET_PRICE_URL');
    const token = this.configService.get<string>('MARKET_PRICE_TOKEN');
    const url = `${baseUrl}/v3/reference/dividends?ticker=${ticker}&apiKey=${token}`;
    const response = await this.axiosService.get<DividendResponse>(url);
    const dividends = response.results;
    return {
      ticker,
      dividendTime: dividends[0] ? dividends[0].frequency : 0,
      dividendMonth: dividends[0]
        ? await this.calculateDividendMonth(
            dividends[0].frequency,
            dividends[0].pay_date,
          )
        : [],
      dividend: dividends[0] ? dividends[0].cash_amount : 0,
      dividendTotal: dividends[0]
        ? dividends[0].cash_amount * dividends[0].frequency
        : 0,
    };
  }

  /**
   * 配当支払い月を取得する
   */
  private async calculateDividendMonth(
    frequency: number,
    payDate: string,
  ): Promise<number[]> {
    if (frequency === 12) return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    // 支払日から、月だけを抜き出す
    const month = format(new Date(payDate), 'MM');
    const monthNumber = Number(month);
    // 初回配当付与月習得
    let dividendFirstMonth: number;
    switch (monthNumber) {
      case 1:
      case 4:
      case 7:
      case 10:
        dividendFirstMonth = 1;
        break;
      case 2:
      case 5:
      case 8:
      case 11:
        dividendFirstMonth = 2;
        break;
      case 3:
      case 6:
      case 9:
      case 12:
        dividendFirstMonth = 3;
        break;
    }
    const interval = 12 / frequency;
    const dividendMonth: number[] = [];
    for (let i = dividendFirstMonth; i <= 12; i += interval) {
      dividendMonth.push(i);
    }
    return dividendMonth;
  }
}
