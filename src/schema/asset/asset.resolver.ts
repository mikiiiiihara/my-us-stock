import { Asset } from '@/common/types/asset/asset.model';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AssetService } from './asset.service';
import { UpdateCashInput } from './dto/input/update-cash.input';
import { UpdateTodayAssetInput } from './dto/input/update-today-asset.input';
import { AccessTokenGuard } from '@/auth/guards/access-token.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Asset)
// @UseGuards(AccessTokenGuard)
export class AssetResolver {
  constructor(private readonly assetService: AssetService) {}

  @Query(() => [Asset], { nullable: true })
  async getAssets(
    @Args('user') user: string,
    @Args('day', { type: () => Int }) day: number,
  ) {
    return this.assetService.fetchAssetList(user, day);
  }

  @Mutation(() => Asset)
  async createTodayAsset(@Args('user') user: string) {
    return this.assetService.createTodayAsset(user);
  }

  @Mutation(() => Asset)
  async updateTodayAsset(
    @Args('input') updateTodayAssetInput: UpdateTodayAssetInput,
  ) {
    return this.assetService.updateTodayAsset(updateTodayAssetInput);
  }

  @Mutation(() => Asset)
  async updateCash(@Args('input') updateCashInput: UpdateCashInput) {
    return this.assetService.updateCash(updateCashInput);
  }
}
