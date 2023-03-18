import { AssetRepository } from '@/repositories/asset/asset.repository';
import { CreateAssetDto } from '@/repositories/asset/dto/create-asset.dto';
import { Asset } from '@/schema/asset/dto/types/asset.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssetService {
  constructor(private readonly assetRepository: AssetRepository) {}
  async createTodayAsset(user: string): Promise<string> {
    // 過去の中の最新データを取得
    const existAssets: Asset[] = await this.assetRepository.fetchAssetList(
      user,
    );
    // 本日の資産が登録されていた場合、登録は行わず処理終了
    const existAsset = await this.assetRepository.fetchTodayAsset(user);
    if (existAsset != null) return 'Already created';
    // 日付比較用
    let latestAsset: Asset;
    let keepDate: Date;
    for (const value of existAssets) {
      const yyyyMMddStr = value.year + '/' + value.month + '/' + value.date;
      const yyyyMMdd = new Date(yyyyMMddStr);
      // latestAsset = 空の場合、現在のvalueを代入・keepDateに代入
      if (latestAsset == null) {
        latestAsset = value;
        keepDate = yyyyMMdd;
      } else {
        // latestAssetが空でなくて、現在のvalueのyyyyMMddがkeepDateより最新の場合
        if (keepDate != null && yyyyMMdd.getTime() > keepDate.getTime()) {
          latestAsset = value;
          keepDate = yyyyMMdd;
        }
      }
    }
    const createAssetDto: CreateAssetDto = {
      asset: latestAsset != null ? latestAsset.asset : 0,
      user,
      cashUSD: latestAsset != null ? latestAsset.cashUSD : 0,
      cashJPY: latestAsset != null ? latestAsset.cashJPY : 0,
    };
    await this.assetRepository.createAsset(createAssetDto);
    return `【${new Date()}】Created Todays Asset of ${user}!`;
  }
}
