import { CryptoModule } from '@/repositories/crypto/crypto.module';
import { CurrencyModule } from '@/repositories/currency/currency.module';
import { Module } from '@nestjs/common';
import { GetTotalService } from './get-total.service';
@Module({
  imports: [CurrencyModule, CryptoModule],
  providers: [GetTotalService],
  exports: [GetTotalService],
})
export class GetTotalModule {}
