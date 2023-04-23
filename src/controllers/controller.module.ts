import { Module } from '@nestjs/common';
import { AssetModule } from './asset/asset.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AssetModule, AuthModule],
})
export class ControllerModule {}
