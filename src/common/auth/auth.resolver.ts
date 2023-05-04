import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from '@/common/auth/auth.service';
import { GqlAuthGuard } from '@/common/auth/guards/gql-auth.guard';
import { LoginResponse } from './dto/types/login-response.type';
import { LoginUserInput } from './dto/input/login-user.input';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }
  @Mutation(() => LoginResponse)
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@Context() context) {
    return this.authService.refreshToken(
      context.req.user,
      context.req.headers.authorization,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtRefreshAuthGuard)
  async logout(@Context() context) {
    return this.authService.logout(context.req.user);
  }
}
