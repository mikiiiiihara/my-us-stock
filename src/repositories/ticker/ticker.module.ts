import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TickerRepository } from './ticker.repository';

@Module({
  imports: [],
  providers: [TickerRepository, PrismaService],
  exports: [TickerRepository],
})
export class TickerModule {}
