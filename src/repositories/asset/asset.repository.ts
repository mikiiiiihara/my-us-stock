import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';
import { Asset } from 'src/schema/asset/dto/types/asset.type';
import { getNowDate } from 'src/util/getNowDate';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Injectable()
export class AssetRepository {
  constructor(private prisma: PrismaService) {}
  // select
  async fetchAssetList(user: string): Promise<Asset[]> {
    return await this.prisma.asset.findMany({
      where: {
        user: user,
      },
      orderBy: {
        addDate: 'asc',
      },
    });
  }
  async fetchTodayAsset(user: string): Promise<Asset> {
    // 現在日時取得
    const now = getNowDate();
    const year = format(now, 'yyyy');
    const month = format(now, 'MM');
    const date = format(now, 'dd');
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
    const { asset, user, cashUSD, cashJPY } = createAssetDto;
    // 現在日時取得
    const now = getNowDate();
    const year = format(now, 'yyyy');
    const month = format(now, 'MM');
    const date = format(now, 'dd');
    // 作成・更新日時取得
    const nowDate = format(now, 'yyyyMMddHHmmss');
    return await this.prisma.asset.create({
      data: {
        asset,
        year,
        month,
        date,
        addDate: nowDate,
        updDate: nowDate,
        user,
        cashUSD,
        cashJPY,
      },
    });
  }

  // update
  async updateAsset(updateAssetDto: UpdateAssetDto): Promise<Asset> {
    const { id, asset, cashUSD, cashJPY } = updateAssetDto;
    // 作成・更新日時取得
    const now = getNowDate();
    const nowDate = format(now, 'yyyyMMddHHmmss');
    return await this.prisma.asset.update({
      where: {
        id,
      },
      data: {
        asset,
        updDate: nowDate,
        cashUSD,
        cashJPY,
      },
    });
  }
}
