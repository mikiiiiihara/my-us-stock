import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from '@/repositories/currency/currency.repository';
import { CryptoRepository } from '@/repositories/crypto/crypto.repository';
import { CryptoTicker } from '@/repositories/crypto/constants';

@Injectable()
export class GetTotalService {
  constructor(
    private readonly currencyRepository: CurrencyRepository,
    private readonly cryptoRepository: CryptoRepository,
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
    const currencyPair = await this.currencyRepository.fetchCurrencyPair();
    const currentUsdJpy = Number(
      currencyPair.find((e) => e.currencyPairCode == 'USDJPY').bid,
    );
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
}
