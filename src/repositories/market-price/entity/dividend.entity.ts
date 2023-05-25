export class DividendEntity {
  ticker: string;
  dividendTime: number;
  // １年のうち、最初の配当支払い月
  dividendFirstTime: number;
  dividend: number;
}
