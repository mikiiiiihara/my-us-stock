import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Ticker } from 'src/schema/ticker/dto/types/ticker.type';
import { CreateTickerDto } from './dto/create-ticker.dto';
import { UpdateTickerDto } from './dto/update-ticker.dto';

@Injectable()
export class TickerRepository {
  constructor(private prisma: PrismaService) {}
  // select
  async fetchTickerList(user: string): Promise<Ticker[]> {
    return await this.prisma.ticker.findMany({
      where: {
        user: user,
      },
    });
  }
  // create
  async createTicker(createTickerDto: CreateTickerDto): Promise<Ticker> {
    const {
      ticker,
      getPrice,
      quantity,
      user,
      dividend,
      dividendTime,
      dividendFirstTime,
      sector,
      usdjpy,
    } = createTickerDto;
    return await this.prisma.ticker.create({
      data: {
        ticker,
        getPrice,
        quantity,
        user,
        dividend,
        dividendTime,
        dividendFirstTime,
        sector,
        usdjpy,
      },
    });
  }
  // update
  async updateTicker(updateTickerDto: UpdateTickerDto): Promise<Ticker> {
    const { id, getPrice, quantity, dividend, usdjpy } = updateTickerDto;
    return await this.prisma.ticker.update({
      where: {
        id: id,
      },
      data: {
        getPrice: getPrice != null ? getPrice : undefined,
        quantity: quantity != null ? quantity : undefined,
        dividend: dividend != null ? dividend : undefined,
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
