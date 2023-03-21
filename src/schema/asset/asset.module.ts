import { GetTotalModule } from '@/common/get-total/get-total.module';
import { Module } from '@nestjs/common';
import { AssetModule as AssetRepositoryModule } from '../../repositories/asset/asset.module';
import { AssetResolver } from './asset.resolver';
import { AssetService } from './asset.service';

@Module({
  imports: [AssetRepositoryModule, GetTotalModule],
  providers: [AssetResolver, AssetService],
})
export class AssetModule {}
