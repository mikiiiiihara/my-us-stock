import { Module } from '@nestjs/common';
import { MarketPriceModule as MarketPriceRepositoryModule } from '@/repositories/market-price/market-price.module';
import { DividendService } from './dividend.service';
import { DividendResolver } from './dividend.resolver';
import { TickerModule as TickerRepositoryModule } from '@/repositories/ticker/ticker.module';

@Module({
  imports: [MarketPriceRepositoryModule, TickerRepositoryModule],
  providers: [DividendResolver, DividendService],
})
export class DividendModule {}
