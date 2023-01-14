import { Query, Resolver } from '@nestjs/graphql';
import { CurrencyService } from './currency.service';

@Resolver(() => Number)
export class CurrencyResolver {
  constructor(private readonly currencyService: CurrencyService) {}

  @Query(() => Number)
  async getCurrentUsdJpy() {
    return this.currencyService.fetchCurrentUsdJpy();
  }
}
