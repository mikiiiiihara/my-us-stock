import { GetTotalModule } from '@/common/get-total/get-total.module';
import { Module } from '@nestjs/common';
import { AssetModule as AssetRepositoryModule } from '../../repositories/asset/asset.module';
import { AssetResolver } from './asset.resolver';
import { AssetService } from './asset.service';
import { TickerModule as TickerRepositoryModule } from '@/repositories/ticker/ticker.module';

@Module({
  imports: [AssetRepositoryModule, GetTotalModule, TickerRepositoryModule],
  providers: [AssetResolver, AssetService],
})
export class AssetModule {}
