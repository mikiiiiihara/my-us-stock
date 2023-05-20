export type CreateTickerDto = {
  userId: string;
  ticker: string;
  getPrice: number;
  quantity: number;
  dividend: number;
  dividendTime: number;
  dividendFirstTime: number;
  sector: string;
  usdjpy: number;
  currentPrice: number;
  priceGets: number;
  currentRate: number;
};
