type Result = {
  cash_amount: number;
  currency: string;
  declaration_date: string;
  dividend_type: string;
  ex_dividend_date: string;
  frequency: number;
  pay_date: string;
  record_date: string;
  ticker: string;
};

export class DividendResponse {
  results: Result[];
  status: string;
  request_id: string;
}
