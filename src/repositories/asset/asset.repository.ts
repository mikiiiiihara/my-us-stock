import { Asset } from '@/@generated/asset/asset.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Injectable()
export class AssetRepository {
  constructor(private prisma: PrismaService) {}
  // select
  async fetchAssetList(user: string, day?: number): Promise<Asset[]> {
    return await this.prisma.asset.findMany({
      where: {
        user: user,
      },
      take: day != null ? day : undefined,
      orderBy: {
        addDate: 'asc',
      },
    });
  }
  async fetchTodayAsset(user: string): Promise<Asset> {
    // 現在日時取得
    const year = format(new Date(), 'yyyy');
    const month = format(new Date(), 'MM');
    const date = format(new Date(), 'dd');
    return await this.prisma.asset.findFirst({
      where: {
        user: user,
        year: year,
        month: month,
        date: date,
      },
    });
  }

  // create
  async createAsset(createAssetDto: CreateAssetDto): Promise<Asset> {
    // 現在日時取得
    const year = format(new Date(), 'yyyy');
    const month = format(new Date(), 'MM');
    const date = format(new Date(), 'dd');
    // 作成・更新日時取得
    const nowDate = format(new Date(), 'yyyyMMddHHmmss');
    return await this.prisma.asset.create({
      data: {
        ...createAssetDto,
        year,
        month,
        date,
        addDate: nowDate,
        updDate: nowDate,
      },
    });
  }

  // update
  async updateAsset(updateAssetDto: UpdateAssetDto): Promise<Asset> {
    const { id } = updateAssetDto;
    // 作成・更新日時取得
    const nowDate = format(new Date(), 'yyyyMMddHHmmss');
    return await this.prisma.asset.update({
      where: {
        id,
      },
      data: {
        ...updateAssetDto,
        updDate: nowDate,
      },
    });
  }
}
