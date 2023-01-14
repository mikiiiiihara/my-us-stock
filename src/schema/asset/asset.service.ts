import { Injectable } from '@nestjs/common';
import { AssetRepository } from 'src/repositories/asset/asset.repository';
import { CreateAssetDto } from 'src/repositories/asset/dto/create-asset.dto';
import { UpdateAssetDto } from 'src/repositories/asset/dto/update-asset.dto';
import { Asset } from './dto/types/asset.type';
import { UpdateOrCreateAssetInput } from './dto/input/update-or-create-asset.input';
import { UpdateAssetInput } from './dto/input/update-asset.input';
import { format } from 'date-fns';

@Injectable()
export class AssetService {
  constructor(private readonly assetRepository: AssetRepository) {}

  async fetchAssetList(user: string): Promise<Asset[]> {
    return this.assetRepository.fetchAssetList(user);
  }

  async updateOrCreateAsset(
    updateOrCreateAssetInput: UpdateOrCreateAssetInput,
  ): Promise<Asset> {
    const { asset, user } = updateOrCreateAssetInput;
    // 現在日時取得
    const year = format(new Date(), 'yyyy');
    const month = format(new Date(), 'MM');
    const date = format(new Date(), 'dd');
    //本日分のデータが既に存在するか？
    const existAssets: Asset[] = await this.assetRepository.fetchAssetList(
      user,
    );

    let existAsset: Asset;
    for (const value of existAssets) {
      if (value != undefined) {
        if (value.year == year && value.month == month && value.date == date) {
          existAsset = value;
        }
      }
    }

    //本日分のデータがない場合、過去の中の最新データを取得
    // 日付比較用
    let latestAsset: Asset;
    let keepDate: Date;
    if (existAsset == null) {
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
    }
    // 更新処理実行（本日分のデータがない場合、新規作成）
    if (existAsset == null) {
      let cashUSD: number;
      let cashJPY: number;
      if (latestAsset == null) {
        cashUSD = 0;
        cashJPY = 0;
      } else {
        cashUSD = latestAsset.cashUSD;
        cashJPY = latestAsset.cashJPY;
      }
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
      const updateAssetDto: UpdateAssetDto = {
        id: existAsset.id,
        asset,
      };
      return await this.assetRepository.updateAsset(updateAssetDto);
    }
  }
  async updateAsset(updateAssetInput: UpdateAssetInput): Promise<Asset> {
    const { asset, id, cashUSD, cashJPY } = updateAssetInput;
    const updateAssetDto: UpdateAssetDto = {
      asset,
      id,
      cashUSD,
      cashJPY,
    };
    return await this.assetRepository.updateAsset(updateAssetDto);
  }
}
