import { GetTotalService } from '@/common/get-total/get-total.service';
import { Asset } from '@/common/types/asset/asset.model';
import { AssetRepository } from '@/repositories/asset/asset.repository';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AssetService } from './asset.service';
import { UpdateCashInput } from './dto/input/update-cash.input';
import { UpdateTodayAssetInput } from './dto/input/update-today-asset.input';
import { TickerRepository } from '@/repositories/ticker/ticker.repository';

const mockAssetRepository = () => ({
  fetchAssetList: jest.fn(),
  fetchTodayAsset: jest.fn(),
  createAsset: jest.fn(),
  updateAsset: jest.fn(),
});
const mockGetTotalService = () => ({
  getTotal: jest.fn(),
});

const mockTickerRepository = () => ({
  fetchTickerList: jest.fn(),
});

describe('AssetService', () => {
  let assetService: AssetService;
  let assetRepository: any;
  let tickerRepository: any;
  let getTotalService: any;

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
          provide: TickerRepository,
          useFactory: mockTickerRepository,
        },
        {
          provide: AssetRepository,
          useFactory: mockAssetRepository,
        },
        {
          provide: GetTotalService,
          useFactory: mockGetTotalService,
        },
        AssetService,
      ],
    }).compile();

    assetService = module.get<AssetService>(AssetService);
    // モック
    assetRepository = module.get<AssetRepository>(AssetRepository);
    tickerRepository = module.get<TickerRepository>(TickerRepository);
    getTotalService = module.get<GetTotalService>(GetTotalService);
  });
  describe('fetchAssetList', () => {
    describe('正常系', () => {
      it('ユーザーに紐付く資産総額を取得する', async () => {
        // repositoryのモック化
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
            user: USER,
            cashUSD: 100,
            cashJPY: 10000,
            cashBTC: 0.1,
            cashETH: 0.1,
            cashRIPPLE: 1,
            cashBAT: 1,
            cashLTC: 1,
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
            total: 628766.537,
            asset: 200000,
            year: '2023',
            month: '03',
            date: '20',
            addDate: '20230321184922',
            updDate: '20230321184950',
            user: USER,
            cashUSD: 100,
            cashJPY: 10000,
            cashBTC: 0.1,
            cashETH: 0.1,
            cashRIPPLE: 1,
            cashBAT: 1,
            cashLTC: 1,
          },
          {
            id: 8,
            total: 628766.537,
            asset: 200000,
            year: '2023',
            month: '03',
            date: '21',
            addDate: '20230321184922',
            updDate: '20230321184950',
            user: USER,
            cashUSD: 100,
            cashJPY: 10000,
            cashBTC: 0.1,
            cashETH: 0.1,
            cashRIPPLE: 1,
            cashBAT: 1,
            cashLTC: 1,
          },
        ];
        assetRepository.fetchAssetList.mockResolvedValue(mockAssetList);
        const newAsset: Readonly<Asset> = {
          id: 8,
          total: 628766.537,
          asset: 200000,
          year: '2023',
          month: '03',
          date: '21',
          addDate: '20230321184922',
          updDate: '20230321184950',
          user: USER,
          cashUSD: 100,
          cashJPY: 10000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
        };
        assetRepository.createAsset.mockResolvedValue(newAsset);
        getTotalService.getTotal.mockResolvedValue(628766.537);
        // テスト実行
        const result = await assetService.createTodayAsset(USER);
        expect(result).toEqual(newAsset);
      });
      it('すでに登録されている資産総額情報が存在しない場合、初回登録し、登録した内容を取得する', async () => {
        // repositoryのモック化
        assetRepository.fetchAssetList.mockResolvedValue([]);
        const newAsset: Readonly<Asset> = {
          id: 6,
          total: 628766.537,
          asset: 200000,
          year: '2023',
          month: '03',
          date: '21',
          addDate: '20230321184922',
          updDate: '20230321184950',
          user: USER,
          cashUSD: 100,
          cashJPY: 10000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
        };
        assetRepository.createAsset.mockResolvedValue(newAsset);
        getTotalService.getTotal.mockResolvedValue(628766.537);
        // テスト実行
        const result = await assetService.createTodayAsset(USER);
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
          total: 628766.537,
          asset: 200000,
          year: '2023',
          month: '03',
          date: '21',
          addDate: '20230321184922',
          updDate: '20230321184950',
          user: USER,
          cashUSD: 100,
          cashJPY: 10000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
        };
        assetRepository.updateAsset.mockResolvedValue(newAsset);
        getTotalService.getTotal.mockResolvedValue(628766.537);
        // リクエストパラメータ
        const updateTodayAssetInput: UpdateTodayAssetInput = {
          id: 6,
          user: USER,
          cashUSD: 100,
          cashJPY: 10000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
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
      // リクエストパラメータ
      const updateCashInput: UpdateCashInput = {
        user: USER,
        cashUSD: 100,
        cashJPY: 10000,
        cashBTC: 0.1,
        cashETH: 0.1,
        cashRIPPLE: 1,
        cashBAT: 1,
        cashLTC: 1,
      };
      it('既存データが存在する場合、保有現金情報を更新し、更新した内容を取得する', async () => {
        // repositoryのモック化
        const newAsset: Readonly<Asset> = {
          id: 6,
          total: 628766.537,
          asset: 200000,
          year: '2023',
          month: '03',
          date: '21',
          addDate: '20230321184922',
          updDate: '20230321184950',
          user: USER,
          cashUSD: 100,
          cashJPY: 10000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
        };
        assetRepository.fetchTodayAsset.mockResolvedValue(newAsset);
        assetRepository.updateAsset.mockResolvedValue(newAsset);
        getTotalService.getTotal.mockResolvedValue(628766.537);
        // テスト実行
        const result = await assetService.updateCash(updateCashInput);
        expect(result).toEqual(newAsset);
      });
      it('既存データが存在しない場合、保有現金情報を追加し、追加した内容を取得する', async () => {
        // repositoryのモック化
        const newAsset: Readonly<Asset> = {
          id: 6,
          total: 628766.537,
          asset: 200000,
          year: '2023',
          month: '03',
          date: '21',
          addDate: '20230321184922',
          updDate: '20230321184950',
          user: USER,
          cashUSD: 100,
          cashJPY: 10000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
        };
        assetRepository.fetchTodayAsset.mockResolvedValue(null);
        assetRepository.createAsset.mockResolvedValue(newAsset);
        getTotalService.getTotal.mockResolvedValue(628766.537);
        // テスト実行
        const result = await assetService.updateCash(updateCashInput);
        expect(result).toEqual(newAsset);
      });
    });
  });
});
