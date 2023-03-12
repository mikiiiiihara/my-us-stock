import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { Strategy } from 'src/schema/strategy/dto/types/strategy.type';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { UpdateStrategyDto } from './dto/update-strategy.dto';

@Injectable()
export class StrategyRepository {
  constructor(private prisma: PrismaService) {}
  //   // select
  async fetchStrategy(user: string): Promise<Strategy> {
    return await this.prisma.strategy.findFirst({
      where: {
        user: user,
      },
    });
  }

  // create
  async createStrategy(
    createStrategyDto: CreateStrategyDto,
  ): Promise<Strategy> {
    const { text, user } = createStrategyDto;
    // 作成・更新日時取得
    const nowDate = format(new Date(), 'yyyyMMdd');
    return await this.prisma.strategy.create({
      data: {
        user,
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
