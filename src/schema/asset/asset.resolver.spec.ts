import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AssetResolver } from './asset.resolver';
import { AssetService } from './asset.service';
import { UpdateCashInput } from './dto/input/update-cash.input';
import { UpdateTodayAssetInput } from './dto/input/update-today-asset.input';
import { Asset } from '@/@generated/prisma-nestjs-graphql/asset/asset.model';

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
  const USER_ID = '9';
  // 取得日数
  const DAY = 7;

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
            total: 628766.537,
            asset: 200000,
            year: '2023',
            month: '03',
            date: '21',
            addDate: '20230321184922',
            updDate: '20230321184950',
            userId: USER_ID,
            cashUSD: 100,
            cashJPY: 10000,
            cashBTC: 0.1,
            cashETH: 0.1,
            cashRIPPLE: 1,
            cashBAT: 1,
            cashLTC: 1,
          },
        ];
        assetService.fetchAssetList.mockResolvedValue(mockAssetList);
        // テスト実行
        const result = await assetResolver.getAssets(USER_ID, DAY);
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
          total: 628766.537,
          asset: 200000,
          year: '2023',
          month: '03',
          date: '21',
          addDate: '20230321184922',
          updDate: '20230321184950',
          userId: USER_ID,
          cashUSD: 100,
          cashJPY: 10000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
        };
        assetService.createTodayAsset.mockResolvedValue(mockAsset);
        // テスト実行
        const result = await assetResolver.createTodayAsset(USER_ID);
        expect(result).toEqual(mockAsset);
      });
    });
  });

  describe('updateTodayAsset', () => {
    describe('正常系', () => {
      it('当日の資産総額を更新し、更新後の内容を取得する', async () => {
        // サービスのモック化
        const mockAsset: Readonly<Asset> = {
          id: 3,
          total: 200000,
          asset: 173743.9,
          year: '2023',
          month: '02',
          date: '22',
          addDate: '20230222233928',
          updDate: '20230222234031',
          userId: USER_ID,
          cashUSD: 100,
          cashJPY: 10000,
          cashBTC: 0,
          cashETH: 0,
          cashRIPPLE: 0,
          cashBAT: 0,
          cashLTC: 0,
        };
        assetService.updateTodayAsset.mockResolvedValue(mockAsset);
        // リクエストパラメータ
        const updateTodayAssetInput: UpdateTodayAssetInput = {
          id: 3,
          cashUSD: 100,
          cashJPY: 10000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
        };
        // テスト実行
        const result = await assetResolver.updateTodayAsset(
          USER_ID,
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
          total: 628766.537,
          asset: 200000,
          year: '2023',
          month: '03',
          date: '21',
          addDate: '20230321184922',
          updDate: '20230321184950',
          userId: USER_ID,
          cashUSD: 100,
          cashJPY: 10000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
        };
        assetService.updateCash.mockResolvedValue(mockAsset);
        // リクエストパラメータ
        const updateCashInput: UpdateCashInput = {
          cashUSD: 100,
          cashJPY: 10000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
        };
        // テスト実行
        const result = await assetResolver.updateCash(USER_ID, updateCashInput);
        expect(result).toEqual(mockAsset);
      });
    });
  });
});
