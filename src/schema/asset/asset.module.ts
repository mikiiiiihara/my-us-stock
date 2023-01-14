import { Module } from '@nestjs/common';
import { AssetModule as AssetRepositoryModule } from '../../repositories/asset/asset.module';
import { AssetResolver } from './asset.resolver';
import { AssetService } from './asset.service';

@Module({
  imports: [AssetRepositoryModule],
  providers: [AssetResolver, AssetService],
})
export class AssetModule {}
