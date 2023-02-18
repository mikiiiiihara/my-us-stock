import { Module } from '@nestjs/common';
import { TickerResolver } from './ticker.resolver';
import { TickerService } from './ticker.service';
import { TickerModule as TickerRepositoryModule } from '../../repositories/ticker/ticker.module';
import { MarketPriceModule as MarketPriceRepositoryModule } from 'src/repositories/market-price/market-price.module';

@Module({
  imports: [TickerRepositoryModule, MarketPriceRepositoryModule],
  providers: [TickerResolver, TickerService],
})
export class TickerModule {}
