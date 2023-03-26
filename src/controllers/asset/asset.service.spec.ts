import { GetTotalService } from '@/common/get-total/get-total.service';
import { Asset } from '@/common/types/asset/asset.model';
import { AssetRepository } from '@/repositories/asset/asset.repository';
import { CurrencyRepository } from '@/repositories/currency/currency.repository';
import { MarketPriceDto } from '@/repositories/market-price/dto/market-price.dto';
import { MarketPriceRepository } from '@/repositories/market-price/market-price.repository';
import { Ticker as TickerOfRepository } from '@/repositories/ticker/entity/tiker.entity';
import { TickerRepository } from '@/repositories/ticker/ticker.repository';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AssetService } from './asset.service';

const mockAssetRepository = () => ({
  fetchAssetList: jest.fn(),
  fetchTodayAsset: jest.fn(),
  createAsset: jest.fn(),
});
const mockTickerRepository = () => ({
  fetchTickerList: jest.fn(),
});
const mockMarketPriceRepository = () => ({
  fetchMarketPrice: jest.fn(),
});
const mockCurrencyRepository = () => ({
  fetchCurrentUsdJpy: jest.fn(),
});
const mockGetTotalService = () => ({
  getTotal: jest.fn(),
});

describe('AssetService', () => {
  let assetService: AssetService;
  let assetRepository: any;
  let tickerRepository: any;
  let marketPriceRepository: any;
  let currencyRepository: any;
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
          provide: TickerRepository,
          useFactory: mockTickerRepository,
        },
        {
          provide: MarketPriceRepository,
          useFactory: mockMarketPriceRepository,
        },
        {
          provide: CurrencyRepository,
          useFactory: mockCurrencyRepository,
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
    marketPriceRepository = module.get<MarketPriceRepository>(
      MarketPriceRepository,
    );
    currencyRepository = module.get<CurrencyRepository>(CurrencyRepository);
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
        // 保有株式情報
        const mockTickerList: Readonly<TickerOfRepository[]> = [
          {
            id: 14,
            ticker: 'AAPL',
            getPrice: 100,
            quantity: 6,
            user: 'test@test.com',
            dividend: 0.92,
            dividendTime: 4,
            dividendFirstTime: 2,
            sector: 'IT',
            usdjpy: 133.9,
          },
        ];
        tickerRepository.fetchTickerList.mockResolvedValue(mockTickerList);
        // マーケット情報
        const mockMarketPrice: Readonly<MarketPriceDto> = {
          currentPrice: 148.5,
          priceGets: -2.09,
          currentRate: -1.3879,
        };
        marketPriceRepository.fetchMarketPrice.mockResolvedValue(
          mockMarketPrice,
        );
        // 現在のドル円
        currencyRepository.fetchCurrentUsdJpy.mockResolvedValue(133.69);
        // 期待値
        const expected = `【${new Date()}】Created Todays Asset of ${USER}!`;
        // テスト実行
        const result = await assetService.createTodayAsset(USER);
        expect(result).toEqual(expected);
      });

      it('本日の資産総額が登録されている場合、処理は行わず、登録済の旨のメッセージが返却される', async () => {
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
