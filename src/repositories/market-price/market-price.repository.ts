import { AxiosService } from '@/axios/axios.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MarketPriceDto } from './dto/market-price.dto';
import { MarketPrice } from './entity/market-price.entity';
import { DividendResponse, Historical } from './dto/dividend.response';
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
    const token = this.configService.get<string>('MARKET_PRICE_TICKER_TOKEN');
    const url = `${baseUrl}/v3/quote-order/${tickerList.toString()}?apikey=${token}`;
    let response;
    try {
      response = await this.axiosService.get<MarketPrice[]>(url);
    } catch (error) {
      console.error(error);
      throw Error(
        '市場価格取得に失敗しました。しばらく待ってからアクセスしてください。',
      );
    }
    // 市場にデータが存在するかチェックする
    if (response.length == 0)
      throw Error('入力された銘柄のデータは存在しません。');
    return response.map((item) => ({
      ticker: item.symbol,
      currentPrice: item.price,
      priceGets: item.change,
      currentRate: item.changesPercentage,
    }));
  }

  /**
   * 指定した銘柄の配当情報を取得する
   */
  async fetchDividend(ticker: string): Promise<DividendEntity> {
    try {
      const token = this.configService.get<string>('MARKET_PRICE_TOKEN');
      const res = await this.fetchDividendApi(token, ticker);
      return this.createDividendEntity(res);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 429) {
        // 429エラーの場合、トークンを変更して再試行
        const token = this.configService.get<string>('MARKET_PRICE_TOKEN_SUB');
        const res = await this.fetchDividendApi(token, ticker);
        return this.createDividendEntity(res);
      } else {
        // 他のエラーの場合はそのままエラーを投げる
        throw Error(
          '配当情報取得に失敗しました。しばらく待ってからアクセスしてください。',
        );
      }
    }
  }

  /**
   * 配当情報をAPIから取得する。
   * */
  private async fetchDividendApi(
    token: string,
    ticker: string,
  ): Promise<DividendResponse> {
    const baseUrl = this.configService.get<string>('MARKET_PRICE_URL');
    const url = `${baseUrl}/v3/historical-price-full/stock_dividend/${ticker}?apikey=${token}`;
    return await this.axiosService.get<DividendResponse>(url);
  }

  /**
   * 直近1年の配当記録をフィルタリング
   * */
  private async filterDividends(
    dividends: Historical[],
  ): Promise<Historical[]> {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1); // 1年前の日付を設定
    const currentDate = new Date(); // 現在の日付を取得
    return dividends.filter((dividend) => {
      const payDate = new Date(
        dividend.paymentDate.length > 1 ? dividend.paymentDate : dividend.date,
      );
      return payDate >= oneYearAgo && payDate <= currentDate;
    });
  }

  /**
   * DividendEntityレスポンスの構築
   * */
  private async createDividendEntity(
    res: DividendResponse,
  ): Promise<DividendEntity> {
    const ticker = res.symbol;
    // 直近１年の配当記録を抽出
    const dividends = await this.filterDividends(res.historical);
    const totalCashAmount = dividends.reduce(
      (sum, dividend) => sum + dividend.dividend,
      0,
    );
    const cashAmount =
      Math.round((totalCashAmount / dividends.length) * 1000) / 1000;
    return {
      ticker,
      dividendTime: dividends.length,
      dividendMonth:
        dividends.length != 0 && dividends[0].paymentDate.length > 1
          ? await this.calculateDividendMonth(
              dividends.length,
              dividends[0].paymentDate,
            )
          : [],
      dividendFixedMonth:
        dividends.length != 0 && dividends[0].date.length > 1
          ? await this.calculateDividendMonth(
              dividends.length,
              dividends[0].date,
            )
          : [],
      dividend: dividends.length != 0 ? cashAmount : 0,
      dividendTotal:
        dividends.length != 0
          ? Math.round(cashAmount * dividends.length * 1000) / 1000
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
