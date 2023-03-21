import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AssetService } from './asset.service';
import { Asset } from './dto/types/asset.type';
import { CreateTodayAssetInput } from './dto/input/create-today-asset.input';
import { UpdateCashInput } from './dto/input/update-cash.input';
import { UpdateTodayAssetInput } from './dto/input/update-today-asset.input';

@Resolver(() => Asset)
export class AssetResolver {
  constructor(private readonly assetService: AssetService) {}

  @Query(() => [Asset], { nullable: true })
  async getAssets(@Args('user') user: string, @Args('day') day: number) {
    return this.assetService.fetchAssetList(user, day);
  }

  @Mutation(() => Asset)
  async createTodayAsset(
    @Args('input') createTodayAssetInput: CreateTodayAssetInput,
  ) {
    return this.assetService.createTodayAsset(createTodayAssetInput);
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
