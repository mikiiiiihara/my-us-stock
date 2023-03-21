import { AssetRepository } from '@/repositories/asset/asset.repository';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AssetService } from './asset.service';
import { CreateTodayAssetInput } from './dto/input/create-today-asset.input';
import { UpdateCashInput } from './dto/input/update-cash.input';
import { UpdateTodayAssetInput } from './dto/input/update-today-asset.input';
import { Asset } from './dto/types/asset.type';

const mockStrategyRepository = () => ({
  fetchAssetList: jest.fn(),
  fetchTodayAsset: jest.fn(),
  createAsset: jest.fn(),
  updateAsset: jest.fn(),
});
describe('StrategyService', () => {
  let assetService: AssetService;
  let assetRepository: any;

  // ユーザー
  const USER = 'test@test.com';
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
        {
          provide: AssetRepository,
          useFactory: mockStrategyRepository,
        },
        AssetService,
      ],
    }).compile();

    assetService = module.get<AssetService>(AssetService);
    // モック
    assetRepository = module.get<AssetRepository>(AssetRepository);
  });
  describe('fetchAssetList', () => {
    describe('正常系', () => {
      it('ユーザーに紐付く資産総額を取得する', async () => {
        // repositoryのモック化
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
        assetRepository.fetchAssetList.mockResolvedValue(mockAssetList);
        // テスト実行
        const result = await assetService.fetchAssetList(USER, DAY);
        expect(result).toEqual(mockAssetList);
      });
    });
  });
  describe('createTodayAsset', () => {
    describe('正常系', () => {
      it('ユーザーに紐付く資産総額を登録し、登録した内容を取得する', async () => {
        // repositoryのモック化
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
          {
            id: 8,
            asset: 292471.3,
            year: '2023',
            month: '02',
            date: '23',
            addDate: '20230223003003',
            updDate: '20230223003025',
            user: USER,
            cashUSD: 100,
            cashJPY: 10000,
          },
        ];
        assetRepository.fetchAssetList.mockResolvedValue(mockAssetList);
        const newAsset: Readonly<Asset> = {
          id: 8,
          asset: 292471.3,
          year: '2023',
          month: '02',
          date: '23',
          addDate: '20230223003003',
          updDate: '20230223003025',
          user: USER,
          cashUSD: 100,
          cashJPY: 10000,
        };
        assetRepository.createAsset.mockResolvedValue(newAsset);
        // リクエストパラメータ
        const createTodayAssetInput: CreateTodayAssetInput = {
          asset: 173743.9,
          user: USER,
        };
        // テスト実行
        const result = await assetService.createTodayAsset(
          createTodayAssetInput,
        );
        expect(result).toEqual(newAsset);
      });
      it('すでに登録されている資産総額情報が存在しない場合、初回登録し、登録した内容を取得する', async () => {
        // repositoryのモック化
        assetRepository.fetchAssetList.mockResolvedValue([]);
        const newAsset: Readonly<Asset> = {
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
        assetRepository.createAsset.mockResolvedValue(newAsset);
        // リクエストパラメータ
        const createTodayAssetInput: CreateTodayAssetInput = {
          asset: 173743.9,
          user: USER,
        };
        // テスト実行
        const result = await assetService.createTodayAsset(
          createTodayAssetInput,
        );
        expect(result).toEqual(newAsset);
      });
    });
  });
  describe('updateTodayAsset', () => {
    describe('正常系', () => {
      it('当日の資産総額を更新し、更新した内容を取得する', async () => {
        // repositoryのモック化
        const newAsset: Readonly<Asset> = {
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
        assetRepository.updateAsset.mockResolvedValue(newAsset);
        // リクエストパラメータ
        const updateTodayAssetInput: UpdateTodayAssetInput = {
          id: 6,
          asset: 173743.9,
        };
        // テスト実行
        const result = await assetService.updateTodayAsset(
          updateTodayAssetInput,
        );
        expect(result).toEqual(newAsset);
      });
    });
  });
  describe('updateCash', () => {
    describe('正常系', () => {
      it('既存データが存在する場合、保有現金情報を更新し、更新した内容を取得する', async () => {
        // repositoryのモック化
        const newAsset: Readonly<Asset> = {
          id: 8,
          asset: 292471.3,
          year: '2023',
          month: '02',
          date: '23',
          addDate: '20230223003003',
          updDate: '20230223003025',
          user: USER,
          cashUSD: 100,
          cashJPY: 10000,
        };
        assetRepository.fetchTodayAsset.mockResolvedValue(newAsset);
        assetRepository.updateAsset.mockResolvedValue(newAsset);
        // リクエストパラメータ
        const updateCashInput: UpdateCashInput = {
          asset: 173743.9,
          user: USER,
          cashUSD: 100,
          cashJPY: 10000,
        };
        // テスト実行
        const result = await assetService.updateCash(updateCashInput);
        expect(result).toEqual(newAsset);
      });
      it('既存データが存在しない場合、保有現金情報を追加し、追加した内容を取得する', async () => {
        // repositoryのモック化
        const newAsset: Readonly<Asset> = {
          id: 8,
          asset: 292471.3,
          year: '2023',
          month: '02',
          date: '23',
          addDate: '20230223003003',
          updDate: '20230223003025',
          user: USER,
          cashUSD: 100,
          cashJPY: 10000,
        };
        assetRepository.fetchTodayAsset.mockResolvedValue(null);
        assetRepository.createAsset.mockResolvedValue(newAsset);
        // リクエストパラメータ
        const updateCashInput: UpdateCashInput = {
          asset: 173743.9,
          user: USER,
          cashUSD: 100,
          cashJPY: 10000,
        };
        // テスト実行
        const result = await assetService.updateCash(updateCashInput);
        expect(result).toEqual(newAsset);
      });
    });
  });
});
