import { AxiosModule } from '@/axios/axios.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MarketPriceRepository } from './market-price.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    AxiosModule,
  ],
  providers: [MarketPriceRepository],
  exports: [MarketPriceRepository],
})
export class MarketPriceModule {}
