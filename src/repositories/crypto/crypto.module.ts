import { AxiosModule } from '@/axios/axios.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CryptoRepository } from './crypto.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    AxiosModule,
  ],
  providers: [CryptoRepository],
  exports: [CryptoRepository],
})
export class CryptoModule {}
