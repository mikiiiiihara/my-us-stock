import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '@/common/auth/guards/access-token.guard';
import { CurrentUserName } from '@/common/auth/decorators/current-user-name-decorator';

@UseGuards(AccessTokenGuard)
@Resolver(() => String)
export class UserResolver {
  @Query(() => String)
  async getUserName(@CurrentUserName() userName: string) {
    return userName;
  }
}
