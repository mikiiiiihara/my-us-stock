import { Body, Controller, Post } from '@nestjs/common';
import { AssetService } from './asset.service';
@Controller('assets')
export class AssetController {
  constructor(private readonly appService: AssetService) {}

  @Post()
  async createTodayAsset(@Body('user') user: string): Promise<string> {
    return await this.appService.createTodayAsset(user);
  }
}
