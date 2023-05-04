import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AssetService } from './asset.service';
import { UpdateCashInput } from './dto/input/update-cash.input';
import { UpdateTodayAssetInput } from './dto/input/update-today-asset.input';
import { Asset } from '@/@generated/prisma-nestjs-graphql/asset/asset.model';
import { CurrentUserId } from '@/common/auth/decorators/current-user-id.decorator';
import { JwtAuthGuard } from '@/common/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UpdateTodayAssetDto } from './dto/update-today-asset.dto';
import { UpdateCashDto } from './dto/update-cash.dto';

@UseGuards(JwtAuthGuard)
@Resolver(() => Asset)
export class AssetResolver {
  constructor(private readonly assetService: AssetService) {}

  @Query(() => [Asset], { nullable: true })
  async getAssets(
    @CurrentUserId() userId: number,
    @Args('day', { type: () => Int }) day: number,
  ) {
    return this.assetService.fetchAssetList(userId, day);
  }

  @Mutation(() => Asset)
  async createTodayAsset(@CurrentUserId() userId: number) {
    return this.assetService.createTodayAsset(userId);
  }

  @Mutation(() => Asset)
  async updateTodayAsset(
    @CurrentUserId() userId: number,
    @Args('input') updateTodayAssetInput: UpdateTodayAssetInput,
  ) {
    const updateTodayAssetDto: UpdateTodayAssetDto = {
      ...updateTodayAssetInput,
      userId,
    };
    return this.assetService.updateTodayAsset(updateTodayAssetDto);
  }

  @Mutation(() => Asset)
  async updateCash(
    @CurrentUserId() userId: number,
    @Args('input') updateCashInput: UpdateCashInput,
  ) {
    const updateCashDto: UpdateCashDto = {
      ...updateCashInput,
      userId,
    };
    return this.assetService.updateCash(updateCashDto);
  }
}
