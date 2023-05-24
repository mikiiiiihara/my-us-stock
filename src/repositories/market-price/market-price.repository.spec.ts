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
      it('指定したティッカーの現在のマーケット情報を取得する(1つ)', async () => {
        // モック化
        axiosService.get.mockResolvedValue({
          c: 155.85,
          d: 2.86,
          dp: 1.8694,
          h: 156.42,
          l: 151.64,
          o: 152.16,
          pc: 152.99,
          t: 1678996805,
        });
        // 期待値
        const expected: MarketPriceDto[] = [
          {
            ticker: 'AAPL',
            currentPrice: 155.85,
            currentRate: 1.8694,
            priceGets: 2.86,
          },
        ];
        // テスト実行
        const result = await marketPriceRepository.fetchMarketPriceList([
          'AAPL',
        ]);
        expect(result).toEqual(expected);
      });
      it('指定したティッカーの現在のマーケット情報を取得する(2つ)', async () => {
        // モック化
        axiosService.get.mockResolvedValueOnce({
          c: 155.85,
          d: 2.86,
          dp: 1.8694,
          h: 156.42,
          l: 151.64,
          o: 152.16,
          pc: 152.99,
          t: 1678996805,
        });
        axiosService.get.mockResolvedValueOnce({
          c: 60.83,
          d: -0.57,
          dp: -0.9283,
          h: 61.42,
          l: 60.775,
          o: 61.38,
          pc: 61.4,
          t: 1684940332,
        });
        // 期待値
        const expected: MarketPriceDto[] = [
          {
            ticker: 'AAPL',
            currentPrice: 155.85,
            currentRate: 1.8694,
            priceGets: 2.86,
          },
          {
            ticker: 'KO',
            currentPrice: 60.83,
            currentRate: -0.9283,
            priceGets: -0.57,
          },
        ];
        // テスト実行
        const result = await marketPriceRepository.fetchMarketPriceList([
          'AAPL',
          'KO',
        ]);
        expect(result).toEqual(expected);
      });
    });
  });
});
