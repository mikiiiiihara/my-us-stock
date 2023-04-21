import { Module } from '@nestjs/common';
import { AxiosService } from './axios.service';
import { LoggerModule } from '@/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [AxiosService],
  exports: [AxiosService],
})
export class AxiosModule {}
