export type Historical = {
  date: string; // 権利落月
  label: string;
  adjDividend: number;
  dividend: number; //配当支払額
  recordDate: string;
  paymentDate: string; // 配当支払月
  declarationDate: string;
};
export class DividendResponse {
  historical: Historical[];
  symbol: string;
}
