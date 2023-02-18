export class Ticker {
  id: number;

  /**
   * ティッカーシンボル
   */
  ticker: string;

  /**
   * 取得価格
   */
  getPrice: number;

  /**
   * 保有株数
   */
  quantity: number;

  /**
   * ユーザー名
   */
  user: string;

  /**
   * 配当
   */
  dividend: number;

  /**
   * 配当付与回数
   */
  dividendTime: number;

  /**
   * 初回配当付与月
   */
  dividendFirstTime: number;

  /**
   * セクター
   */
  sector: string;

  /**
   * 購入時為替
   */
  usdjpy: number;
}
