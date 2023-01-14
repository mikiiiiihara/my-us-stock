import { Module } from '@nestjs/common';
import { TickerResolver } from './ticker.resolver';
import { TickerService } from './ticker.service';
import { TickerModule as TickerRepositoryModule } from '../../repositories/ticker/ticker.module';

@Module({
  imports: [TickerRepositoryModule],
  providers: [TickerResolver, TickerService],
})
export class TickerModule {}
