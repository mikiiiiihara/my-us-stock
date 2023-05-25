import { AxiosService } from '@/axios/axios.service';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MarketPriceDto } from './dto/market-price.dto';
import { MarketPriceRepository } from './market-price.repository';

const mockAxiosService = () => ({
  get: jest.fn(),
});

describe('MarketPriceRepository', () => {
  let marketPriceRepository: MarketPriceRepository;
  let axiosService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.example'],
        }),
      ],
      providers: [
        MarketPriceRepository,
        {
          provide: AxiosService,
          useFactory: mockAxiosService,
        },
      ],
    }).compile();

    marketPriceRepository = module.get<MarketPriceRepository>(
      MarketPriceRepository,
    );
    axiosService = module.get<AxiosService>(AxiosService);
  });
  describe('fetchMarketPriceList', () => {
    describe('正常系', () => {
      it('指定したティッカーの現在のマーケット情報を取得する', async () => {
        // モック化
        axiosService.get.mockResolvedValue({
          tickers: [
            {
              ticker: 'AAPL',
              todaysChangePerc: 0.9336010242085632,
              todaysChange: 1.604299999999995,
              updated: 1685039213391185200,
              day: {
                o: 172.41,
                h: 173.895,
                l: 171.69,
                c: 173.3127,
                v: 32930822,
                vw: 172.7004,
              },
              min: {
                av: 32929574,
                t: 1685039100000,
                o: 173.37,
                h: 173.38,
                l: 173.2857,
                c: 173.3152,
                v: 62212,
                vw: 173.3345,
              },
              prevDay: {
                o: 171.09,
                h: 172.4183,
                l: 170.52,
                c: 171.84,
                v: 43711588,
                vw: 171.5088,
              },
            },
            {
              ticker: 'TSLA',
              todaysChangePerc: 1.2192454893384306,
              todaysChange: 2.2299999999999898,
              updated: 1685039213458729700,
              day: {
                o: 186.54,
                h: 186.78,
                l: 180.58,
                c: 185.0235,
                v: 74734038,
                vw: 184.1442,
              },
              min: {
                av: 74720087,
                t: 1685039100000,
                o: 185.2011,
                h: 185.2186,
                l: 184.95,
                c: 184.9609,
                v: 219430,
                vw: 185.0703,
              },
              prevDay: {
                o: 182.23,
                h: 184.22,
                l: 178.22,
                c: 182.9,
                v: 137603831,
                vw: 181.4964,
              },
            },
            {
              ticker: 'VGT',
              todaysChangePerc: 3.726282100129548,
              todaysChange: 14.670000000000016,
              updated: 1685039183608457500,
              day: {
                o: 404.9,
                h: 409.145,
                l: 402.31,
                c: 408.17,
                v: 471705,
                vw: 405.9721,
              },
              min: {
                av: 471705,
                t: 1685039100000,
                o: 408.4429,
                h: 408.4429,
                l: 408.17,
                c: 408.17,
                v: 4802,
                vw: 408.2596,
              },
              prevDay: {
                o: 393.02,
                h: 395.14,
                l: 391.39,
                c: 393.69,
                v: 379854,
                vw: 392.8117,
              },
            },
          ],
          status: 'OK',
          request_id: '2d76de98c29d88350cc24a847bdd86fa',
          count: 3,
        });
        // 期待値
        const expected: MarketPriceDto[] = [
          {
            ticker: 'AAPL',
            currentPrice: 173.3127,
            currentRate: 0.9336010242085632,
            priceGets: 1.604299999999995,
          },
          {
            currentPrice: 185.0235,
            currentRate: 1.2192454893384306,
            priceGets: 2.2299999999999898,
            ticker: 'TSLA',
          },
          {
            currentPrice: 408.17,
            currentRate: 3.726282100129548,
            priceGets: 14.670000000000016,
            ticker: 'VGT',
          },
        ];
        // テスト実行
        const result = await marketPriceRepository.fetchMarketPriceList([
          'AAPL',
          'TSLA',
          'VGT',
        ]);
        expect(result).toEqual(expected);
      });
    });
  });
});
