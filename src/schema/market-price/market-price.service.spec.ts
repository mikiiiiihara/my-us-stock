import { MarketPriceRepository } from '@/repositories/market-price/market-price.repository';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MarketPrice } from './dto/types/market-price.type';
import { MarketPriceService } from './market-price.service';

const mockMarketPriceRepository = () => ({
  fetchMarketPrice: jest.fn(),
});
describe('MarketPriceService', () => {
  let marketPriceService: MarketPriceService;
  let marketPriceRepository: any;

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
          provide: MarketPriceRepository,
          useFactory: mockMarketPriceRepository,
        },
        MarketPriceService,
      ],
    }).compile();

    marketPriceService = module.get<MarketPriceService>(MarketPriceService);
    // モック
    marketPriceRepository = module.get<MarketPriceRepository>(
      MarketPriceRepository,
    );
  });
  describe('fetchMarketPriceList', () => {
    describe('正常系', () => {
      it('指定したティッカーの現在価格を取得する', async () => {
        // repositoryのモック化
        const mockMarketAAPLPrice: Readonly<MarketPrice> = {
          ticker: 'AAPl',
          currentPrice: 148.5,
          currentRate: -1.3879,
          priceGets: -2.09,
        };
        marketPriceRepository.fetchMarketPrice.mockResolvedValueOnce(
          mockMarketAAPLPrice,
        );
        const mockMarketKOPrice: Readonly<MarketPrice> = {
          ticker: 'KO',
          currentPrice: 59.21,
          currentRate: -0.4205,
          priceGets: -0.25,
        };
        marketPriceRepository.fetchMarketPrice.mockResolvedValueOnce(
          mockMarketKOPrice,
        );
        // リクエストパラメータ
        const tickerList = ['AAPL', 'KO'];
        const expected: Readonly<MarketPrice[]> = [
          {
            ticker: 'AAPL',
            currentPrice: 148.5,
            currentRate: -1.3879,
            priceGets: -2.09,
          },
          {
            ticker: 'KO',
            currentPrice: 59.21,
            currentRate: -0.4205,
            priceGets: -0.25,
          },
        ];
        // テスト実行
        const result = await marketPriceService.fetchMarketPriceList(
          tickerList,
        );
        expect(result).toEqual(expected);
      });
    });
  });
});
