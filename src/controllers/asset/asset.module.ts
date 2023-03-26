import { CurrencyModule as CurrencyRepositoryModule } from '@/repositories/currency/currency.module';
import { MarketPriceModule as MarketPriceRepositoryModule } from '@/repositories/market-price/market-price.module';
import { TickerModule as TickerRepositoryModule } from '@/repositories/ticker/ticker.module';
import { Module } from '@nestjs/common';
import { GetTotalModule } from '../../common/get-total/get-total.module';
import { AssetModule as AssetRepositoryModule } from '../../repositories/asset/asset.module';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';

@Module({
  imports: [
    AssetRepositoryModule,
    TickerRepositoryModule,
    MarketPriceRepositoryModule,
    GetTotalModule,
    CurrencyRepositoryModule,
  ],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
