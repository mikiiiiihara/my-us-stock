import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AssetResolver } from './asset.resolver';
import { AssetService } from './asset.service';
import { CreateTodayAssetInput } from './dto/input/create-today-asset.input';
import { UpdateCashInput } from './dto/input/update-cash.input';
import { UpdateTodayAssetInput } from './dto/input/update-today-asset.input';
import { Asset } from './dto/types/asset.type';

const mockAssetService = () => ({
  fetchAssetList: jest.fn(),
  createTodayAsset: jest.fn(),
  updateTodayAsset: jest.fn(),
  updateCash: jest.fn(),
});
describe('AssetResolver', () => {
  let assetResolver: AssetResolver;
  let assetService: any;

  // ユーザー
  const USER = 'test@test.com';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.example'],
        }),
      ],
      providers: [
        AssetResolver,
        {
          provide: AssetService,
          useFactory: mockAssetService,
        },
      ],
    }).compile();

    assetResolver = module.get<AssetResolver>(AssetResolver);
    // モック
    assetService = module.get<AssetService>(AssetService);
  });
  describe('getAssets', () => {
    describe('正常系', () => {
      it('ユーザーに紐付く資産総額を取得する', async () => {
        // サービスのモック化
        const mockAssetList: Readonly<Asset[]> = [
          {
            id: 6,
            asset: 173743.9,
            year: '2023',
            month: '02',
            date: '22',
            addDate: '20230222233928',
            updDate: '20230222234031',
            user: USER,
            cashUSD: 100,
            cashJPY: 10000,
          },
        ];
        assetService.fetchAssetList.mockResolvedValue(mockAssetList);
        // テスト実行
        const result = await assetResolver.getAssets(USER);
        expect(result).toEqual(mockAssetList);
      });
    });
  });
  describe('createTodayAsset', () => {
    describe('正常系', () => {
      it('当日の資産総額を追加し、追加した内容を取得する', async () => {
        // サービスのモック化
        const mockAsset: Readonly<Asset> = {
          id: 6,
          asset: 173743.9,
          year: '2023',
          month: '02',
          date: '22',
          addDate: '20230222233928',
          updDate: '20230222234031',
          user: USER,
          cashUSD: 100,
          cashJPY: 10000,
        };
        assetService.createTodayAsset.mockResolvedValue(mockAsset);
        // リクエストパラメータ
        const createTodayAssetInput: CreateTodayAssetInput = {
          asset: 173743.9,
          user: USER,
        };
        // テスト実行
        const result = await assetResolver.createTodayAsset(
          createTodayAssetInput,
        );
        expect(result).toEqual(mockAsset);
      });
    });
  });

  describe('updateTodayAsset', () => {
    describe('正常系', () => {
      it('当日の資産総額を更新し、更新後の内容を取得する', async () => {
        // サービスのモック化
        const mockAsset: Readonly<Asset> = {
          id: 6,
          asset: 173743.9,
          year: '2023',
          month: '02',
          date: '22',
          addDate: '20230222233928',
          updDate: '20230222234031',
          user: USER,
          cashUSD: 100,
          cashJPY: 10000,
        };
        assetService.updateTodayAsset.mockResolvedValue(mockAsset);
        // リクエストパラメータ
        const updateTodayAssetInput: UpdateTodayAssetInput = {
          id: 6,
          asset: 173743.9,
        };
        // テスト実行
        const result = await assetResolver.updateTodayAsset(
          updateTodayAssetInput,
        );
        expect(result).toEqual(mockAsset);
      });
    });
  });

  describe('updateCash', () => {
    describe('正常系', () => {
      it('当日の資産総額を更新し、更新後の内容を取得する', async () => {
        // サービスのモック化
        const mockAsset: Readonly<Asset> = {
          id: 6,
          asset: 173743.9,
          year: '2023',
          month: '02',
          date: '22',
          addDate: '20230222233928',
          updDate: '20230222234031',
          user: USER,
          cashUSD: 100,
          cashJPY: 10000,
        };
        assetService.updateCash.mockResolvedValue(mockAsset);
        // リクエストパラメータ
        const updateCashInput: UpdateCashInput = {
          user: USER,
          asset: 173743.9,
          cashUSD: 100,
          cashJPY: 10000,
        };
        // テスト実行
        const result = await assetResolver.updateCash(updateCashInput);
        expect(result).toEqual(mockAsset);
      });
    });
  });
});
