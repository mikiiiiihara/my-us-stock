import { Injectable } from '@nestjs/common';
import { AssetRepository } from 'src/repositories/asset/asset.repository';
import { CreateAssetDto } from 'src/repositories/asset/dto/create-asset.dto';
import { UpdateAssetDto } from 'src/repositories/asset/dto/update-asset.dto';
import { Asset } from './dto/asset.type';
import { CreateAssetInput } from './dto/input/create-asset.input';
import { UpdateAssetInput } from './dto/input/update-asset.input';

@Injectable()
export class AssetService {
  constructor(private readonly assetRepository: AssetRepository) {}

  async fetchAssetList(user: string): Promise<Asset[]> {
    return this.assetRepository.fetchAssetList(user);
  }

  async createAsset(createAssetInput: CreateAssetInput): Promise<Asset> {
    const { asset, user, cashUSD, cashJPY } = createAssetInput;
    // 当日分のデータが存在する場合、更新
    const createAssetDto: CreateAssetDto = {
      asset,
      user,
      cashUSD,
      cashJPY,
    };
    return await this.assetRepository.createAsset(createAssetDto);
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
