import { CryptoModule } from '@/repositories/crypto/crypto.module';
import { CurrencyModule } from '@/repositories/currency/currency.module';
import { Module } from '@nestjs/common';
import { GetTotalService } from './get-total.service';
import { MarketPriceModule as MarketPriceRepositoryModule } from '@/repositories/market-price/market-price.module';
@Module({
  imports: [CurrencyModule, CryptoModule, MarketPriceRepositoryModule],
  providers: [GetTotalService],
  exports: [GetTotalService],
})
export class GetTotalModule {}
