import { Module } from '@nestjs/common';
import { TickerRepository } from './ticker.repository';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  imports: [],
  providers: [TickerRepository, PrismaService],
  exports: [TickerRepository],
})
export class TickerModule {}
