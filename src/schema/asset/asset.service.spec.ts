import { GetTotalService } from '@/common/get-total/get-total.service';
import { AssetRepository } from '@/repositories/asset/asset.repository';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AssetService } from './asset.service';
import { TickerRepository } from '@/repositories/ticker/ticker.repository';
import { Asset } from '@/@generated/prisma-nestjs-graphql/asset/asset.model';
import { UpdateTodayAssetDto } from './dto/update-today-asset.dto';
import { UpdateCashDto } from './dto/update-cash.dto';

const mockAssetRepository = () => ({
  fetchAssetList: jest.fn(),
  fetchTodayAsset: jest.fn(),
  createAsset: jest.fn(),
  updateAsset: jest.fn(),
});
const mockGetTotalService = () => ({
  getTotal: jest.fn(),
  getCurrentTickerPriceSum: jest.fn(),
});

const mockTickerRepository = () => ({
  fetchTickerList: jest.fn(),
});

describe('AssetService', () => {
  let assetService: AssetService;
  let assetRepository: any;
  let getTotalService: any;

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
        assetRepository.fetchAssetList.mockResolvedValue(mockAssetList);
        // テスト実行
        const result = await assetService.fetchAssetList(USER_ID, DAY);
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
            userId: USER_ID,
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
          userId: USER_ID,
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
        getTotalService.getCurrentTickerPriceSum.mockResolvedValue(200000);
        // テスト実行
        const result = await assetService.createTodayAsset(USER_ID);
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
          userId: USER_ID,
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
        getTotalService.getCurrentTickerPriceSum.mockResolvedValue(200000);
        // テスト実行
        const result = await assetService.createTodayAsset(USER_ID);
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
          userId: USER_ID,
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
        getTotalService.getCurrentTickerPriceSum.mockResolvedValue(200000);
        // リクエストパラメータ
        const updateTodayAssetDto: UpdateTodayAssetDto = {
          id: 6,
          userId: USER_ID,
          cashUSD: 100,
          cashJPY: 10000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
        };
        // テスト実行
        const result = await assetService.updateTodayAsset(updateTodayAssetDto);
        expect(result).toEqual(newAsset);
      });
    });
  });
  describe('updateCash', () => {
    describe('正常系', () => {
      // リクエストパラメータ
      const updateCashDto: UpdateCashDto = {
        userId: USER_ID,
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
          userId: USER_ID,
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
        getTotalService.getCurrentTickerPriceSum.mockResolvedValue(200000);
        // テスト実行
        const result = await assetService.updateCash(updateCashDto);
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
          userId: USER_ID,
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
        const result = await assetService.updateCash(updateCashDto);
        expect(result).toEqual(newAsset);
      });
    });
  });
});
