import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StrategyRepository {
  constructor(private prisma: PrismaService) {}
  //   // select
  //   async fetchStrategy(user: string): Promise<Asset[]> {
  //     return await this.prisma.asset.findMany({
  //       where: {
  //         user: user,
  //       },
  //       orderBy: {
  //         addDate: 'asc',
  //       },
  //     });
  //   }

  //   // create
  //   async createStrategy(createAssetDto: CreateAssetDto): Promise<Asset> {
  //     const { asset, user, cashUSD, cashJPY } = createAssetDto;
  //     // 現在日時取得
  //     const year = format(new Date(), 'yyyy');
  //     const month = format(new Date(), 'MM');
  //     const date = format(new Date(), 'dd');
  //     // 作成・更新日時取得
  //     const nowDate = format(new Date(), 'yyyyMMddHHmmss');
  //     return await this.prisma.asset.create({
  //       data: {
  //         asset,
  //         year,
  //         month,
  //         date,
  //         addDate: nowDate,
  //         updDate: nowDate,
  //         user,
  //         cashUSD,
  //         cashJPY,
  //       },
  //     });
  //   }

  //   // update
  //   async updateStrategy(updateAssetDto: UpdateAssetDto): Promise<Asset> {
  //     const { id, asset, cashUSD, cashJPY } = updateAssetDto;
  //     // 作成・更新日時取得
  //     const nowDate = format(new Date(), 'yyyyMMddHHmmss');
  //     return await this.prisma.asset.update({
  //       where: {
  //         id,
  //       },
  //       data: {
  //         asset,
  //         updDate: nowDate,
  //         cashUSD: cashUSD ?? undefined,
  //         cashJPY: cashJPY ?? undefined,
  //       },
  //     });
  //   }
}
