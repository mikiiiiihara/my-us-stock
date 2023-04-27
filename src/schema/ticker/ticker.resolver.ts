import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTickerInput } from './dto/input/create-ticker.input';
import { UpdateTickerInput } from './dto/input/update-ticker.input';
import { Ticker } from './dto/types/ticker.type';
import { TickerService } from './ticker.service';
import { AccessTokenGuard } from '@/auth/guards/access-token.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Ticker)
// @UseGuards(AccessTokenGuard)
export class TickerResolver {
  constructor(private readonly tickerService: TickerService) {}

  @Query(() => [Ticker], { nullable: true })
  async getTickers(@Args('user') user: string) {
    return this.tickerService.fetchTickerList(user);
  }
  @Mutation(() => Ticker)
  async createTicker(@Args('input') createTickerInput: CreateTickerInput) {
    return this.tickerService.createTicker(createTickerInput);
  }

  @Mutation(() => Ticker)
  async updateTicker(@Args('input') updateTickerInput: UpdateTickerInput) {
    return this.tickerService.updateTicker(updateTickerInput);
  }
  @Mutation(() => Ticker)
  async deleteTicker(@Args('input') updateTickerInput: UpdateTickerInput) {
    return this.tickerService.deleteTicker(updateTickerInput);
  }
}
