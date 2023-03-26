import { Module } from '@nestjs/common';
import { AssetModule } from './asset/asset.module';
import { CurrencyModule } from './currency/currency.module';
import { MarketPriceModule } from './market-price/market-price.module';
import { StrategyModule } from './strategy/strategy.module';
import { TickerModule } from './ticker/ticker.module';

@Module({
  imports: [
    AssetModule,
    CurrencyModule,
    MarketPriceModule,
    StrategyModule,
    TickerModule,
  ],
})
export class SchemaModule {}
