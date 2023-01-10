import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TickerResolver } from './ticker.resolver';
import { TickerService } from './ticker.service';

@Module({
  imports: [],
  providers: [TickerResolver, TickerService, PrismaService],
})
export class TickerModule {}
