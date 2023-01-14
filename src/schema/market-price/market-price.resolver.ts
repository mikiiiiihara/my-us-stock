import { Args, Query, Resolver } from '@nestjs/graphql';
import { MarketPrice } from './dto/types/market-price.type';
import { MarketPriceService } from './market-price.service';

@Resolver(() => [MarketPrice])
export class MarketPriceResolver {
  constructor(private readonly marketPriceService: MarketPriceService) {}

  @Query(() => [MarketPrice])
  async getMarketPrices(
    @Args({ name: 'tickerList', type: () => [String], nullable: 'items' })
    tickerList: string[],
  ) {
    return this.marketPriceService.fetchMarketPriceList(tickerList);
  }
}
