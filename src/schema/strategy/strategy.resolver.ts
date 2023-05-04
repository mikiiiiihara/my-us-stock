import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateStrategyInput } from './dto/input/update-strategy.input';
import { StrategyService } from './strategy.service';
import { CurrentUserId } from '@/common/auth/decorators/current-user-id.decorator';
import { JwtAuthGuard } from '@/common/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Strategy } from '@/@generated/prisma-nestjs-graphql/strategy/strategy.model';
import { UpdateStrategyDto } from './dto/update-strategy.dto';

@UseGuards(JwtAuthGuard)
@Resolver(() => Strategy)
// @UseGuards(AccessTokenGuard)
export class StrategyResolver {
  constructor(private readonly strategyService: StrategyService) {}

  @Query(() => Strategy, { nullable: true })
  async getStrategy(@CurrentUserId() userId: number) {
    return await this.strategyService.fetchStrategy(userId);
  }

  @Mutation(() => Strategy)
  async updateStrategy(
    @CurrentUserId() userId: number,
    @Args('input') updateStrategyInput: UpdateStrategyInput,
  ) {
    const updateStrategyDto: UpdateStrategyDto = {
      userId,
      ...updateStrategyInput,
    };
    return await this.strategyService.updateStrategy(updateStrategyDto);
  }
}
