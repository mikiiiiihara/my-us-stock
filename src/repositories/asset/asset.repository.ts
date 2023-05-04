import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Asset } from '@/@generated/prisma-nestjs-graphql/asset/asset.model';
@Injectable()
export class AssetRepository {
  constructor(private prisma: PrismaService) {}
  // select
  async fetchAssetList(userId: number, day?: number): Promise<Asset[]> {
    return await this.prisma.asset.findMany({
      where: {
        userId,
      },
      // 指定した日数分の直近の値をとる
      take: day != null ? day : undefined,
      orderBy: {
        addDate: 'desc',
      },
    });
  }
  async fetchTodayAsset(userId: number): Promise<Asset> {
    // 現在日時取得
    const year = format(new Date(), 'yyyy');
    const month = format(new Date(), 'MM');
    const date = format(new Date(), 'dd');
    return await this.prisma.asset.findFirst({
      where: {
        userId,
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
