import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CurrencyRepository } from './currency.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
  ],
  providers: [CurrencyRepository],
  exports: [CurrencyRepository],
})
export class CurrencyModule {}
