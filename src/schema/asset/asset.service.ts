import { Injectable } from '@nestjs/common';
import { AssetRepository } from '@/repositories/asset/asset.repository';
import { CreateAssetDto } from 'src/repositories/asset/dto/create-asset.dto';
import { UpdateAssetDto } from 'src/repositories/asset/dto/update-asset.dto';
import { Asset } from './dto/types/asset.type';
import { CreateTodayAssetInput } from './dto/input/create-today-asset.input';
import { UpdateCashInput } from './dto/input/update-cash.input';
import { UpdateTodayAssetInput } from './dto/input/update-today-asset.input';

@Injectable()
export class AssetService {
  constructor(private readonly assetRepository: AssetRepository) {}

  async fetchAssetList(user: string): Promise<Asset[]> {
    return await this.assetRepository.fetchAssetList(user);
  }

  // 当日の資産総額を更新する(画面側で当日データのidを指定する)
  async createTodayAsset(
    createTodayAssetInput: CreateTodayAssetInput,
  ): Promise<Asset> {
    const { asset, user } = createTodayAssetInput;
    // 過去の中の最新データを取得
    const existAssets: Asset[] = await this.assetRepository.fetchAssetList(
      user,
    );
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
    const cashUSD = latestAsset == null ? 0 : latestAsset.cashUSD;
    const cashJPY = latestAsset == null ? 0 : latestAsset.cashJPY;
    // create
    const createAssetDto: CreateAssetDto = {
      asset,
      user,
      cashUSD,
      cashJPY,
    };
    return await this.assetRepository.createAsset(createAssetDto);
  }

  // 当日の資産総額を更新する(画面側で当日データのidを指定する)
  async updateTodayAsset(
    updateTodayAssetInput: UpdateTodayAssetInput,
  ): Promise<Asset> {
    const { id, asset } = updateTodayAssetInput;
    // update
    const updateAssetDto: UpdateAssetDto = {
      id,
      asset,
    };
    return await this.assetRepository.updateAsset(updateAssetDto);
  }

  async updateCash(updateCashInput: UpdateCashInput): Promise<Asset> {
    const { asset, user, cashUSD, cashJPY } = updateCashInput;

    //本日分のデータが既に存在するか？
    const existAsset = await this.assetRepository.fetchTodayAsset(user);
    // 処理実行
    if (existAsset == null) {
      // create
      // create
      const createAssetDto: CreateAssetDto = {
        asset,
        user,
        cashUSD,
        cashJPY,
      };
      return await this.assetRepository.createAsset(createAssetDto);
    } else {
      // update
    }
    // update
    const updateAssetDto: UpdateAssetDto = {
      id: existAsset.id,
      asset,
      cashUSD,
      cashJPY,
    };
    return await this.assetRepository.updateAsset(updateAssetDto);
  }
}
