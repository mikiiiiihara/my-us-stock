import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/common/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { FindUniqueUserArgs } from '@/@generated/prisma-nestjs-graphql/user/find-unique-user.args';
import { CurrentUserId } from '../auth/decorators/current-user-id.decorator';
import { CreateOneUserArgs } from '@/@generated/prisma-nestjs-graphql/user/create-one-user.args';
import { User } from '@/@generated/prisma-nestjs-graphql/user/user.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async user(@CurrentUserId() id: number) {
    const args: FindUniqueUserArgs = {
      where: {
        id: id,
      },
    };

    return this.userService.findUnique(args);
  }

  @Mutation(() => User)
  async createUser(@Args() args: CreateOneUserArgs) {
    args.data.password = await bcrypt.hash(args.data.password, 10);
    return this.userService.createUser(args);
  }
}
