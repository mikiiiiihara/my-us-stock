import { Module } from '@nestjs/common';
import { MarketPriceModule as MarketPriceRepositoryModule } from '../../repositories/market-price/market-price.module';
import { MarketPriceResolver } from './market-price.resolver';
import { MarketPriceService } from './market-price.service';

@Module({
  imports: [MarketPriceRepositoryModule],
  providers: [MarketPriceResolver, MarketPriceService],
})
export class MarketPriceModule {}
