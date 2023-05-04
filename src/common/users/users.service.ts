import { Injectable } from '@nestjs/common';
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model';
import { FindFirstUserArgs } from 'src/@generated/prisma-nestjs-graphql/user/find-first-user.args';
import { CreateOneUserArgs } from 'src/@generated/prisma-nestjs-graphql/user/create-one-user.args';
import { FindUniqueUserArgs } from 'src/@generated/prisma-nestjs-graphql/user/find-unique-user.args';
import { UpdateOneUserArgs } from 'src/@generated/prisma-nestjs-graphql/user/update-one-user.args';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findFirst(args: FindFirstUserArgs): Promise<User | null> {
    return this.prisma.user.findFirst(args);
  }

  async findUnique(args: FindUniqueUserArgs): Promise<User | null> {
    return this.prisma.user.findUnique(args);
  }

  async createUser(args: CreateOneUserArgs): Promise<User> {
    return this.prisma.user.create(args);
  }

  async update(args: UpdateOneUserArgs): Promise<User> {
    return this.prisma.user.update(args);
  }

  // ユーザーIDを取得
  async findUserId(email: string): Promise<number> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user.id;
  }
}
