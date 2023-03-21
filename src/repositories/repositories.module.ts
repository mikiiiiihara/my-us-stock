import { Module } from '@nestjs/common';
import { CryptoModule } from './crypto/crypto.module';
import { CurrencyModule } from './currency/currency.module';
import { MarketPriceModule } from './market-price/market-price.module';
import { StrategyModule } from './strategy/strategy.module';
import { TickerModule } from './ticker/ticker.module';

@Module({
  imports: [
    TickerModule,
    CurrencyModule,
    MarketPriceModule,
    StrategyModule,
    CryptoModule,
  ],
  exports: [
    TickerModule,
    CurrencyModule,
    MarketPriceModule,
    StrategyModule,
    CryptoModule,
  ],
})
export class RepositoriesModule {}
