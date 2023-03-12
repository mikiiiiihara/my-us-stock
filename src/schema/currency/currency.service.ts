import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from '@/repositories/currency/currency.repository';

@Injectable()
export class CurrencyService {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  // 現在のドル円を取得する
  async fetchCurrentUsdJpy(): Promise<number> {
    const currencyPair = await this.currencyRepository.fetchCurrencyPair();
    const currentUsdJpy = currencyPair.find(
      (e) => e.currencyPairCode == 'USDJPY',
    ).bid;
    return Number(currentUsdJpy);
  }
}
