import { Injectable } from '@nestjs/common';
import { StrategyRepository } from 'src/repositories/strategy/strategy.repository';
import { UpdateStrategyInput } from './dto/input/update-strategy.input';
import { Strategy } from './dto/types/strategy.type';
@Injectable()
export class StrategyService {
  constructor(private readonly strategyRepository: StrategyRepository) {}

  async fetchStrategy(user: string): Promise<Strategy> {
    return await this.strategyRepository.fetchStrategy(user);
  }

  // 保有株式情報を更新(既存データない場合、新規作成)
  async updateStrategy(
    updateStrategyInput: UpdateStrategyInput,
  ): Promise<Strategy> {
    const { user, text } = updateStrategyInput;
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
