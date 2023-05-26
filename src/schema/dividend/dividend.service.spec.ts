import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TickerRepository } from '@/repositories/ticker/ticker.repository';
import { MarketPriceRepository } from '@/repositories/market-price/market-price.repository';
import { Ticker as TickerOfRepository } from '@/@generated/prisma-nestjs-graphql/ticker/ticker.model';
import { DividendService } from './dividend.service';
import { DividendEntity } from '@/repositories/market-price/entity/dividend.entity';
import { Dividend } from './types/dividend.type';

const mockTickerRepository = () => ({
  fetchTickerList: jest.fn(),
});
const mockMarketPriceRepository = () => ({
  fetchDividend: jest.fn(),
});

describe('DividendService', () => {
  let dividendService: DividendService;
  let tickerRepository: any;
  let marketPriceRepository: any;

  // ユーザーID
  const USER_ID = '9';

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
          provide: MarketPriceRepository,
          useFactory: mockMarketPriceRepository,
        },
        DividendService,
      ],
    }).compile();

    dividendService = module.get<DividendService>(DividendService);
    // モック
    tickerRepository = module.get<TickerRepository>(TickerRepository);
    marketPriceRepository = module.get<MarketPriceRepository>(
      MarketPriceRepository,
    );
  });
  describe('fetchTickerList', () => {
    describe('正常系', () => {
      it('ユーザーに紐付く保有株式の配当情報を取得する', async () => {
        // repositoryのモック化
        const mockTickerList: Readonly<TickerOfRepository[]> = [
          {
            id: 14,
            ticker: 'AAPL',
            getPrice: 100,
            quantity: 6,
            userId: USER_ID,
            sector: 'IT',
            usdjpy: 133.9,
          },
        ];
        tickerRepository.fetchTickerList.mockResolvedValue(mockTickerList);
        const mockDividendEntity: Readonly<DividendEntity> = {
          ticker: 'AAPL',
          dividend: 0.23,
          dividendTotal: 0.92,
          dividendTime: 4,
          dividendMonth: [2, 5, 8, 11],
        };
        marketPriceRepository.fetchDividend.mockResolvedValue(
          mockDividendEntity,
        );
        // 期待値
        const expected: Readonly<Dividend[]> = [
          {
            ticker: 'AAPL',
            dividend: 0.23,
            dividendTotal: 0.92,
            dividendTime: 4,
            dividendMonth: [2, 5, 8, 11],
            quantity: 6,
          },
        ];
        // テスト実行
        const result = await dividendService.getDividendList(USER_ID);
        expect(result).toEqual(expected);
      });

      it('ユーザーが株式を保有していない場合、空配列を取得する', async () => {
        // repositoryのモック化
        tickerRepository.fetchTickerList.mockResolvedValue([]);
        // テスト実行
        const result = await dividendService.getDividendList(USER_ID);
        expect(result).toEqual([]);
      });
    });
  });
});
