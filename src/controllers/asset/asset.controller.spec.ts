import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';

const mockAssetService = () => ({
  createTodayAsset: jest.fn(),
});
describe('AssetController', () => {
  let assetController: AssetController;
  let assetService: any;

  // ユーザー
  const USER_ID = '9';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.example'],
        }),
      ],
      providers: [
        AssetController,
        {
          provide: AssetService,
          useFactory: mockAssetService,
        },
      ],
    }).compile();

    assetController = module.get<AssetController>(AssetController);
    // モック
    assetService = module.get<AssetService>(AssetService);
  });
  describe('createTodayAsset', () => {
    describe('正常系', () => {
      it('当日の資産総額を追加し、追加した内容を取得する', async () => {
        // 期待値
        const expected = `【${new Date()}】Created Todays Asset of ${USER_ID}!`;
        // サービスのモック化
        assetService.createTodayAsset.mockResolvedValue(expected);
        // テスト実行
        const result = await assetController.createTodayAsset(USER_ID);
        expect(result).toEqual(expected);
      });
    });
  });
});
