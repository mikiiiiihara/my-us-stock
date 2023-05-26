import { Query, Resolver } from '@nestjs/graphql';
import { DividendService } from './dividend.service';
import { Dividend } from './types/dividend.type';
import { AccessTokenGuard } from '@/common/auth/guards/access-token.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUserId } from '@/common/auth/decorators/current-user-id.decorator';

@UseGuards(AccessTokenGuard)
@Resolver(() => Dividend)
export class DividendResolver {
  constructor(private readonly dividendService: DividendService) {}

  @Query(() => [Dividend])
  async getDividendList(@CurrentUserId() userId: string) {
    return await this.dividendService.getDividendList(userId);
  }
}
