import { AxiosModule } from '@/axios/axios.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CurrencyRepository } from './currency.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    AxiosModule,
  ],
  providers: [CurrencyRepository],
  exports: [CurrencyRepository],
})
export class CurrencyModule {}
