import { Body, Controller, Post } from '@nestjs/common';
import { AssetService } from './asset.service';
@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  async createTodayAsset(@Body('userId') userId: string): Promise<string> {
    console.log(userId);
    console.log(typeof userId);
    return await this.assetService.createTodayAsset(userId);
  }
}
