import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Ticker } from './dto/types/ticker.type';

@Injectable()
export class TickerService {
  constructor(private prisma: PrismaService) {}
  async fetchTickerList(user: string): Promise<Ticker[]> {
    return this.prisma.ticker.findMany({
      where: {
        user: user,
      },
    });
  }
}
