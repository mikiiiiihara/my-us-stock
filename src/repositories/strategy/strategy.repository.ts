import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { UpdateStrategyDto } from './dto/update-strategy.dto';
import { Strategy } from '@/@generated/prisma-nestjs-graphql/strategy/strategy.model';

@Injectable()
export class StrategyRepository {
  constructor(private prisma: PrismaService) {}
  //   // select
  async fetchStrategy(userId: number): Promise<Strategy> {
    return await this.prisma.strategy.findFirst({
      where: {
        userId,
      },
    });
  }

  // create
  async createStrategy(
    createStrategyDto: CreateStrategyDto,
  ): Promise<Strategy> {
    const { text, userId } = createStrategyDto;
    // 作成・更新日時取得
    const nowDate = format(new Date(), 'yyyyMMdd');
    return await this.prisma.strategy.create({
      data: {
        userId,
        text,
        addDate: nowDate,
        updDate: nowDate,
      },
    });
  }

  // update
  async updateStrategy(
    updateStrategyDto: UpdateStrategyDto,
  ): Promise<Strategy> {
    const { text, id } = updateStrategyDto;
    // 作成・更新日時取得
    const nowDate = format(new Date(), 'yyyyMMdd');
    return await this.prisma.strategy.update({
      where: {
        id,
      },
      data: {
        text,
        updDate: nowDate,
      },
    });
  }
}
