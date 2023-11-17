export type Result = {
  cash_amount: number;
  currency: string;
  declaration_date: string;
  dividend_type: string;
  ex_dividend_date: string; // 配当権利確定月
  frequency: number; // 配当支払回数
  pay_date: string; // 配当支払月
  record_date: string;
  ticker: string;
};

export class DividendResponse {
  results: Result[];
  status: string;
  request_id: string;
}
