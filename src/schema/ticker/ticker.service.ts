import { Injectable } from '@nestjs/common';
import { TickerRepository } from 'src/repositories/ticker/ticker.repository';
import { CreateTickerInput } from './dto/input/create-ticker.input';
import { UpdateTickerInput } from './dto/input/update-ticker.input';
import { Ticker } from './dto/types/ticker.type';

@Injectable()
export class TickerService {
  constructor(private readonly tickerRepository: TickerRepository) {}

  async fetchTickerList(user: string): Promise<Ticker[]> {
    return this.tickerRepository.fetchTickerList(user);
  }
  async createTicker(createTickerInput: CreateTickerInput): Promise<Ticker> {
    return this.tickerRepository.createTicker(createTickerInput);
  }

  // 保有株式情報を更新（株数が0の場合は削除）
  async updateTicker(updateTickerInput: UpdateTickerInput): Promise<Ticker> {
    const { quantity, id } = updateTickerInput;
    if (quantity != 0) {
      // 所有株情報の現在価格を更新
      return await this.tickerRepository.updateTicker(updateTickerInput);
    } else {
      //レコード削除
      return await this.tickerRepository.deleteTicker(id);
    }
  }
}
