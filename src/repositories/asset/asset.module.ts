import { Module } from '@nestjs/common';
import { AssetRepository } from './asset.repository';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  imports: [],
  providers: [AssetRepository, PrismaService],
  exports: [AssetRepository],
})
export class AssetModule {}
