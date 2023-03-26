import { GetTotalService } from '@/common/get-total/get-total.service';
import { Asset } from '@/common/types/asset/asset.model';
import { AssetRepository } from '@/repositories/asset/asset.repository';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AssetService } from './asset.service';

const mockAssetRepository = () => ({
  fetchAssetList: jest.fn(),
  fetchTodayAsset: jest.fn(),
  createAsset: jest.fn(),
});
const mockGetTotalService = () => ({
  getTotal: jest.fn(),
});

describe('AssetService', () => {
  let assetService: AssetService;
  let assetRepository: any;
  let getTotalService: any;

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
  describe('createTodayAsset', () => {
    describe('正常系', () => {
      it('本日の資産総額が登録されていない場合、ユーザーに紐付く資産総額を登録し、登録した内容を取得する', async () => {
        // repositoryのモック化
        assetRepository.fetchTodayAsset.mockResolvedValue(undefined);
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
        // 期待値
        const expected = `【${new Date()}】Created Todays Asset of ${USER}!`;
        // テスト実行
        const result = await assetService.createTodayAsset(USER);
        expect(result).toEqual(expected);
      });

      it('本日の資産総額が登録されていない場合、ユーザーに紐付く資産総額を登録し、登録した内容を取得する', async () => {
        // repositoryのモック化
        assetRepository.fetchTodayAsset.mockResolvedValue(undefined);
        const mockTodayAsset: Readonly<Asset> = {
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
        };
        assetRepository.fetchTodayAsset.mockResolvedValue(mockTodayAsset);
        // 期待値
        const expected = 'Already created';
        // テスト実行
        const result = await assetService.createTodayAsset(USER);
        expect(result).toEqual(expected);
      });
    });
  });
});
