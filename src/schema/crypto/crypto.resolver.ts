import { CryptoTicker } from '@/repositories/crypto/constants';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CryptoService } from './crypto.service';
import { CryptoCurrency } from './dto/crypto-currency.type';

@Resolver(() => [CryptoCurrency])
export class CryptoResolver {
  constructor(private readonly cryptoService: CryptoService) {}

  @Query(() => [CryptoCurrency])
  async getCryptoPriceList(
    @Args({ name: 'cryptoList', type: () => [String], nullable: 'items' })
    cryptoList: CryptoTicker[],
  ) {
    return this.cryptoService.getCryptoPriceList(cryptoList);
  }
}
