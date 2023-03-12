import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MarketPriceResolver } from './market-price.resolver';
import { MarketPriceService } from './market-price.service';

const mockMarketPriceService = () => ({
  fetchMarketPriceList: jest.fn(),
});
describe('MarketPriceResolver', () => {
  let marketPriceResolver: MarketPriceResolver;
  let marketPriceService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.example'],
        }),
      ],
      providers: [
        MarketPriceResolver,
        {
          provide: MarketPriceService,
          useFactory: mockMarketPriceService,
        },
      ],
    }).compile();

    marketPriceResolver = module.get<MarketPriceResolver>(MarketPriceResolver);
    // モック
    marketPriceService = module.get<MarketPriceService>(MarketPriceService);
  });
  describe('getMarketPrices', () => {
    describe('正常系', () => {
      it('指定したティッカーの現在価格を取得する', async () => {
        // サービスのモック化
        const mockMarketPriceList = [
          {
            ticker: 'AAPl',
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
        marketPriceService.fetchMarketPriceList.mockResolvedValue(
          mockMarketPriceList,
        );
        // リクエストパラメータ
        const tickerList = ['AAPL', 'KO'];
        // テスト実行
        const result = await marketPriceResolver.getMarketPrices(tickerList);
        expect(result).toEqual(mockMarketPriceList);
      });
    });
  });
});
