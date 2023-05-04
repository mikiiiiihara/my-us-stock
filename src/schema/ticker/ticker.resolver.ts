import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTickerInput } from './dto/input/create-ticker.input';
import { UpdateTickerInput } from './dto/input/update-ticker.input';
import { Ticker } from './dto/types/ticker.type';
import { TickerService } from './ticker.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/common/auth/guards/jwt-auth.guard';
import { CurrentUserId } from '@/common/auth/decorators/current-user-id.decorator';
import { CreateTickerDto } from './dto/create-ticker.dto';

@UseGuards(JwtAuthGuard)
@Resolver(() => Ticker)
export class TickerResolver {
  constructor(private readonly tickerService: TickerService) {}

  @Query(() => [Ticker], { nullable: true })
  async getTickers(@CurrentUserId() userId: number) {
    return this.tickerService.fetchTickerList(userId);
  }
  @Mutation(() => Ticker)
  async createTicker(
    @CurrentUserId() userId: number,
    @Args('input') createTickerInput: CreateTickerInput,
  ) {
    const creatTickerDto: CreateTickerDto = {
      ...createTickerInput,
      userId,
    };
    return this.tickerService.createTicker(creatTickerDto);
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
