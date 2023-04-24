import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from '@/repositories/currency/currency.repository';
import { CryptoRepository } from '@/repositories/crypto/crypto.repository';
import { CryptoTicker } from '@/repositories/crypto/constants';
import { Ticker as TickerOfRepository } from '@/repositories/ticker/entity/tiker.entity';
import { MarketPriceRepository } from '@/repositories/market-price/market-price.repository';

@Injectable()
export class GetTotalService {
  constructor(
    private readonly currencyRepository: CurrencyRepository,
    private readonly cryptoRepository: CryptoRepository,
    private readonly marketPriceRepository: MarketPriceRepository,
  ) {}

  async getTotal(
    asset: number, // 円建て
    cashUSD: number,
    cashJPY: number,
    cashBTC: number,
    cashETH: number,
    cashRIPPLE: number,
    cashBAT: number,
    cashLTC: number,
  ): Promise<number> {
    // 現在のドル円を取得
    const currentUsdJpy = await this.currencyRepository.fetchCurrentUsdJpy();
    // ドル建てのものを円に直す
    const cashUSDbyJPY = cashUSD * currentUsdJpy;
    // 現在の仮想通貨情報取得する
    const cryptoList: CryptoTicker[] = ['btc', 'eth', 'xrp', 'bat', 'ltc'];
    const currenctCryptoList = await Promise.all(
      cryptoList.map(
        async (name) => await this.cryptoRepository.fetchCryptoPrice(name),
      ),
    );
    const getCurrentPriceByTicker = (ticker: CryptoTicker) => {
      return currenctCryptoList.find((crypto) => crypto.name === ticker).price;
    };
    // 保有仮想通貨を円に直す
    const cashBTCbyJPY = cashBTC * getCurrentPriceByTicker('btc');
    const cashETHbyJPY = cashETH * getCurrentPriceByTicker('eth');
    const cashRIPPLEbyJPY = cashRIPPLE * getCurrentPriceByTicker('xrp');
    const cashBATbyJPY = cashBAT * getCurrentPriceByTicker('bat');
    const cashLTCbyJPY = cashLTC * getCurrentPriceByTicker('ltc');
    const total =
      asset +
      cashJPY +
      cashUSDbyJPY +
      cashBTCbyJPY +
      cashETHbyJPY +
      cashRIPPLEbyJPY +
      cashBATbyJPY +
      cashLTCbyJPY;
    return Math.round(total * 10) / 10;
  }
  async getCurrentTickerPriceSum(
    tickerList: TickerOfRepository[],
  ): Promise<number> {
    // 保有株がなければ、0を返す
    if (tickerList.length === 0) return 0;
    const tickerNameList = tickerList.map((ticker) => ticker.ticker);
    const marketPriceList =
      await this.marketPriceRepository.fetchMarketPriceList(tickerNameList);
    // 現在の保有株の総額リストを計算し返却する
    const currentTickerPriceListByUsd = tickerList.map((tickerItem) => {
      const marketPrice = marketPriceList.find(
        (marketPrice) => marketPrice.ticker == tickerItem.ticker,
      );
      // 現在価格 * 保有株数の値を返却する
      return marketPrice.currentPrice * tickerItem.quantity;
    });
    // 現在のドル円を取得する
    const currentUsdJpy = await this.currencyRepository.fetchCurrentUsdJpy();
    return (
      currentTickerPriceListByUsd.reduce((sum, element) => sum + element, 0) *
      currentUsdJpy
    );
  }
}
