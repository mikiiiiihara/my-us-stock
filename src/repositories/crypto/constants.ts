export const CRYPTO_TICKER = {
  BTC: 'btc',
  ETH: 'eth',
  RIPPLE: 'xrp',
  BAT: 'bat',
  LTC: 'ltc',
} as const;
// 検索で使用する仮想通貨
export type CryptoTicker = (typeof CRYPTO_TICKER)[keyof typeof CRYPTO_TICKER];
