import { Injectable } from '@nestjs/common';
import { CryptoRepository } from '@/repositories/crypto/crypto.repository';
import { CryptoTicker } from '@/repositories/crypto/constants';
import { CryptoCurrency } from './dto/crypto-currency.type';

@Injectable()
export class CryptoService {
  constructor(private readonly cryptoRepository: CryptoRepository) {}

  // 指定した仮想通貨の価格を取得する
  async getCryptoPriceList(
    cryptoList: CryptoTicker[],
  ): Promise<CryptoCurrency[]> {
    return await Promise.all(
      cryptoList.map(
        async (name) => await this.cryptoRepository.fetchCryptoPrice(name),
      ),
    );
  }
}
