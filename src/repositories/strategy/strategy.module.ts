import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StrategyRepository } from './strategy.repository';

@Module({
  imports: [],
  providers: [StrategyRepository, PrismaService],
  exports: [StrategyRepository],
})
export class StrategyModule {}
