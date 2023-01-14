import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AssetService } from './asset.service';
import { Asset } from './dto/asset.type';
import { CreateAssetInput } from './dto/input/create-asset.input';
import { UpdateAssetInput } from './dto/input/update-asset.input';

@Resolver(() => Asset)
export class AssetResolver {
  constructor(private readonly assetService: AssetService) {}

  @Query(() => [Asset], { nullable: true })
  async getAssets(@Args('user') user: string) {
    return this.assetService.fetchAssetList(user);
  }

  @Mutation(() => Asset)
  async createAsset(@Args('input') createAssetInput: CreateAssetInput) {
    return this.assetService.createAsset(createAssetInput);
  }

  @Mutation(() => Asset)
  async updateAsset(@Args('input') updateAssetInput: UpdateAssetInput) {
    return this.assetService.updateAsset(updateAssetInput);
  }
}
