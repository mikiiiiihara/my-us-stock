import { Body, Controller, Post } from '@nestjs/common';
import { AssetService } from './asset.service';
@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  async createTodayAsset(@Body('userId') userId: number): Promise<string> {
    return await this.assetService.createTodayAsset(userId);
  }
}
