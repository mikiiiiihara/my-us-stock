import { Asset } from '@/@generated/asset/asset.model';
import { GetTotalService } from '@/common/get-total/get-total.service';
import { AssetRepository } from '@/repositories/asset/asset.repository';
import { CreateAssetDto } from '@/repositories/asset/dto/create-asset.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssetService {
  constructor(
    private readonly assetRepository: AssetRepository,
    private readonly getTotalService: GetTotalService,
  ) {}
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
    // 直近の資産データの現金額を登録
    const asset = latestAsset == null ? 0 : latestAsset.asset;
    const cashUSD = latestAsset == null ? 0 : latestAsset.cashUSD;
    const cashJPY = latestAsset == null ? 0 : latestAsset.cashJPY;
    const cashBTC = latestAsset == null ? 0 : latestAsset.cashBTC;
    const cashETH = latestAsset == null ? 0 : latestAsset.cashETH;
    const cashRIPPLE = latestAsset == null ? 0 : latestAsset.cashRIPPLE;
    const cashBAT = latestAsset == null ? 0 : latestAsset.cashBAT;
    const cashLTC = latestAsset == null ? 0 : latestAsset.cashLTC;
    // 合計金額
    const total = await this.getTotalService.getTotal(
      asset,
      cashUSD,
      cashJPY,
      cashBTC,
      cashETH,
      cashRIPPLE,
      cashBAT,
      cashLTC,
    );
    const createAssetDto: CreateAssetDto = {
      asset,
      user,
      cashUSD,
      cashJPY,
      total,
      cashBTC,
      cashETH,
      cashRIPPLE,
      cashBAT,
      cashLTC,
    };
    await this.assetRepository.createAsset(createAssetDto);
    return `【${new Date()}】Created Todays Asset of ${user}!`;
  }
}