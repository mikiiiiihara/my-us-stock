import { Module } from '@nestjs/common';
import { CurrencyModule as CurrencyRepositoryModule } from '../../repositories/currency/currency.module';
import { CurrencyResolver } from './currency.resolver';
import { CurrencyService } from './currency.service';

@Module({
  imports: [CurrencyRepositoryModule],
  providers: [CurrencyResolver, CurrencyService],
})
export class CurrencyModule {}
