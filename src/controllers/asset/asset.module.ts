import { TickerModule as TickerRepositoryModule } from '@/repositories/ticker/ticker.module';
import { Module } from '@nestjs/common';
import { GetTotalModule } from '../../common/get-total/get-total.module';
import { AssetModule as AssetRepositoryModule } from '../../repositories/asset/asset.module';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';

@Module({
  imports: [AssetRepositoryModule, TickerRepositoryModule, GetTotalModule],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
