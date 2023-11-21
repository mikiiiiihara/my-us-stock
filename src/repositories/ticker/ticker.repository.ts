import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTickerDto } from './dto/create-ticker.dto';
import { UpdateTickerDto } from './dto/update-ticker.dto';
import { Ticker } from '@/@generated/prisma-nestjs-graphql/ticker/ticker.model';

@Injectable()
export class TickerRepository {
  constructor(private prisma: PrismaService) {}
  // select
  async fetchTickerList(userId: string): Promise<Ticker[]> {
    return await this.prisma.ticker.findMany({
      where: {
        userId,
      },
    });
  }
  // create
  async createTicker(createTickerDto: CreateTickerDto): Promise<Ticker> {
    const { ticker, getPrice, quantity, userId, sector, usdjpy } =
      createTickerDto;
    // 既にDBに登録されているかチェックする
    const existTicker = await this.prisma.ticker.findFirst({
      where: { ticker },
    });
    if (existTicker) throw new Error('この銘柄は既に登録されています。');
    return await this.prisma.ticker.create({
      data: {
        ticker,
        getPrice,
        quantity,
        userId,
        sector,
        usdjpy,
      },
    });
  }
  // update
  async updateTicker(updateTickerDto: UpdateTickerDto): Promise<Ticker> {
    const { id, getPrice, quantity, usdjpy } = updateTickerDto;
    return await this.prisma.ticker.update({
      where: {
        id: id,
      },
      data: {
        getPrice: getPrice != null ? getPrice : undefined,
        quantity: quantity != null ? quantity : undefined,
        usdjpy: usdjpy != null ? usdjpy : undefined,
      },
    });
  }
  // delete
  async deleteTicker(id: number): Promise<Ticker> {
    return await this.prisma.ticker.delete({
      where: {
        id,
      },
    });
  }
}
