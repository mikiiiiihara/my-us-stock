import { Args, Query, Resolver } from '@nestjs/graphql';
import { Ticker } from './dto/types/ticker.type';
import { TickerService } from './ticker.service';

@Resolver(() => Ticker)
export class TickerResolver {
  constructor(private readonly tickerService: TickerService) {}

  @Query(() => [Ticker], { nullable: true })
  async readAllTickers(@Args('user') user: string) {
    return this.tickerService.fetchTickerList(user);
  }
}
