import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateStrategyInput } from './dto/input/update-strategy.input';
import { Strategy } from './dto/types/strategy.type';
import { StrategyService } from './strategy.service';

@Resolver(() => Strategy)
// @UseGuards(AccessTokenGuard)
export class StrategyResolver {
  constructor(private readonly strategyService: StrategyService) {}

  @Query(() => Strategy, { nullable: true })
  async getStrategy(@Args('user') user: string) {
    return await this.strategyService.fetchStrategy(user);
  }

  @Mutation(() => Strategy)
  async updateStrategy(
    @Args('input') updateStrategyInput: UpdateStrategyInput,
  ) {
    return await this.strategyService.updateStrategy(updateStrategyInput);
  }
}
