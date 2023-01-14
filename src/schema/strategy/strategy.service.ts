import { Injectable } from '@nestjs/common';
import { StrategyRepository } from 'src/repositories/strategy/strategy.repository';
import { Strategy } from './dto/types/strategy.type';
import { UpdateStrategyDto } from './dto/update-strategy.dto';
@Injectable()
export class StrategyService {
  constructor(private readonly strategyRepository: StrategyRepository) {}

  async fetchStrategy(user: string): Promise<Strategy> {
    return await this.strategyRepository.fetchStrategy(user);
  }

  // 保有株式情報を更新(既存データない場合、新規作成)
  async updateStrategy(
    updateStrategyDto: UpdateStrategyDto,
  ): Promise<Strategy> {
    const { user, text } = updateStrategyDto;
    const existStrategy = await this.strategyRepository.fetchStrategy(user);
    if (existStrategy !== null) {
      // update
      return await this.strategyRepository.updateStrategy({
        id: existStrategy.id,
        text,
      });
    } else {
      // create
      return await this.strategyRepository.createStrategy({ user, text });
    }
  }
}
