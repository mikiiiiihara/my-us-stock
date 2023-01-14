import { Module } from '@nestjs/common';
import { StrategyResolver } from './strategy.resolver';
import { StrategyService } from './strategy.service';
import { StrategyModule as StrategyRepositoryModule } from '../../repositories/strategy/strategy.module';

@Module({
  imports: [StrategyRepositoryModule],
  providers: [StrategyResolver, StrategyService],
})
export class StrategyModule {}
