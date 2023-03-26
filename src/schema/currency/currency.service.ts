import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from '@/repositories/currency/currency.repository';

@Injectable()
export class CurrencyService {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  // 現在のドル円を取得する
  async fetchCurrentUsdJpy(): Promise<number> {
    return await this.currencyRepository.fetchCurrentUsdJpy();
  }
}
