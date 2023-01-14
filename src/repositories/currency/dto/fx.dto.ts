export type CurrencyPair = {
  high: string;
  open: string;
  bid: string;
  currencyPairCode: string;
  ask: string;
  low: string;
};

export class Fx {
  quotes: CurrencyPair[];
}
