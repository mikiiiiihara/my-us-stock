import { Module } from '@nestjs/common';
import { StrategyRepository } from './strategy.repository';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  imports: [],
  providers: [StrategyRepository, PrismaService],
  exports: [StrategyRepository],
})
export class StrategyModule {}
