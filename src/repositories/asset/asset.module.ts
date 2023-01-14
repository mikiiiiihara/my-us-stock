import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AssetRepository } from './asset.repository';

@Module({
  imports: [],
  providers: [AssetRepository, PrismaService],
  exports: [AssetRepository],
})
export class AssetModule {}
