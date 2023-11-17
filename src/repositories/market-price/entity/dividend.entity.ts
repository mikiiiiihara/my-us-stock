export class DividendEntity {
  ticker: string;
  dividendTime: number;
  // １年のうち、最初の配当支払い月
  dividendMonth: number[];
  dividendFixedMonth: number[];
  dividend: number;
  dividendTotal: number;
}
