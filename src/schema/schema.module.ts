import { Module } from '@nestjs/common';
import { AssetModule } from './asset/asset.module';
import { CurrencyModule } from './currency/currency.module';
import { MarketPriceModule } from './market-price/market-price.module';
import { StrategyModule } from './strategy/strategy.module';
import { TickerModule } from './ticker/ticker.module';
import { UserModule } from './user/user.module';
import { DividendModule } from './dividend/dividend.module';

@Module({
  imports: [
    AssetModule,
    CurrencyModule,
    MarketPriceModule,
    StrategyModule,
    TickerModule,
    UserModule,
    DividendModule,
  ],
})
export class SchemaModule {}
