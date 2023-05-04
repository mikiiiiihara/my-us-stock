import { StrategyRepository } from '@/repositories/strategy/strategy.repository';
import { Injectable } from '@nestjs/common';
import { Strategy } from '@/@generated/prisma-nestjs-graphql/strategy/strategy.model';
import { UpdateStrategyDto } from './dto/update-strategy.dto';

@Injectable()
export class StrategyService {
  constructor(private readonly strategyRepository: StrategyRepository) {}

  async fetchStrategy(userId: number): Promise<Strategy> {
    return await this.strategyRepository.fetchStrategy(userId);
  }

  // 保有株式情報を更新(既存データない場合、新規作成)
  async updateStrategy(
    updateStrategyDto: UpdateStrategyDto,
  ): Promise<Strategy> {
    const { userId, text } = updateStrategyDto;
    const existStrategy = await this.strategyRepository.fetchStrategy(userId);
    if (existStrategy !== null) {
      // update
      return await this.strategyRepository.updateStrategy({
        id: existStrategy.id,
        text,
      });
    } else {
      // create
      return await this.strategyRepository.createStrategy({ userId, text });
    }
  }
}
