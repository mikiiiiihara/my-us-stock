import { Injectable } from '@nestjs/common';
import { CreateTickerDto } from 'src/repositories/ticker/dto/create-ticker.dto';
import { UpdateTickerDto } from 'src/repositories/ticker/dto/update-ticker.dto';
import { TickerRepository } from 'src/repositories/ticker/ticker.repository';
import { Ticker } from './dto/types/ticker.type';

@Injectable()
export class TickerService {
  constructor(private readonly tickerRepository: TickerRepository) {}

  async fetchTickerList(user: string): Promise<Ticker[]> {
    return this.tickerRepository.fetchTickerList(user);
  }
  async createTicker(createTickerDto: CreateTickerDto): Promise<Ticker> {
    return this.tickerRepository.createTicker(createTickerDto);
  }

  // 保有株式情報を更新（株数が0の場合は削除）
  async updateTicker(updateTickerDto: UpdateTickerDto): Promise<Ticker> {
    const { quantity, id } = updateTickerDto;
    if (quantity != 0) {
      // 所有株情報の現在価格を更新
      return await this.tickerRepository.updateTicker(updateTickerDto);
    } else {
      //レコード削除
      return await this.tickerRepository.deleteTicker(id);
    }
  }
}
