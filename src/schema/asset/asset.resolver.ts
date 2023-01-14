import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AssetService } from './asset.service';
import { Asset } from './dto/types/asset.type';
import { UpdateOrCreateAssetInput } from './dto/input/update-or-create-asset.input';
import { UpdateCashInput } from './dto/input/update-cash.input';

@Resolver(() => Asset)
export class AssetResolver {
  constructor(private readonly assetService: AssetService) {}

  @Query(() => [Asset], { nullable: true })
  async getAssets(@Args('user') user: string) {
    return this.assetService.fetchAssetList(user);
  }

  @Mutation(() => Asset)
  async updateOrCreateAsset(
    @Args('input') updateOrCreateAssetInput: UpdateOrCreateAssetInput,
  ) {
    return this.assetService.updateOrCreateAsset(updateOrCreateAssetInput);
  }

  @Mutation(() => Asset)
  async updateCash(@Args('input') updateCashInput: UpdateCashInput) {
    return this.assetService.updateCash(updateCashInput);
  }
}
