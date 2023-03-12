import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TickerService } from './ticker.service';
import { TickerRepository } from '@/repositories/ticker/ticker.repository';
import { MarketPriceRepository } from '@/repositories/market-price/market-price.repository';
import { MarketPriceDto } from '@/repositories/market-price/dto/market-price.dto';
import { Ticker as TickerOfRepository } from '@/repositories/ticker/entity/tiker.entity';
import { Ticker } from './dto/types/ticker.type';
import { CreateTickerInput } from './dto/input/create-ticker.input';
import { UpdateTickerInput } from './dto/input/update-ticker.input';

const mockTickerRepository = () => ({
  fetchTickerList: jest.fn(),
  createTicker: jest.fn(),
  updateTicker: jest.fn(),
  deleteTicker: jest.fn(),
});
const mockMarketPriceRepository = () => ({
  fetchMarketPrice: jest.fn(),
});

describe('TickerService', () => {
  let tickerService: TickerService;
  let tickerRepository: any;
  let marketPriceRepository: any;

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
          provide: TickerRepository,
          useFactory: mockTickerRepository,
        },
        {
          provide: MarketPriceRepository,
          useFactory: mockMarketPriceRepository,
        },
        TickerService,
      ],
    }).compile();

    tickerService = module.get<TickerService>(TickerService);
    // モック
    tickerRepository = module.get<TickerRepository>(TickerRepository);
    marketPriceRepository = module.get<MarketPriceRepository>(
      MarketPriceRepository,
    );
  });
  describe('fetchTickerList', () => {
    describe('正常系', () => {
      it('ユーザーに紐付く保有株式情報を取得する', async () => {
        // repositoryのモック化
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
        const mockMarketPrice: Readonly<MarketPriceDto> = {
          currentPrice: 148.5,
          priceGets: -2.09,
          currentRate: -1.3879,
        };
        marketPriceRepository.fetchMarketPrice.mockResolvedValue(
          mockMarketPrice,
        );
        // 期待値
        const expected: Readonly<Ticker[]> = [
          {
            currentPrice: 148.5,
            currentRate: -1.3879,
            dividend: 0.92,
            dividendFirstTime: 2,
            dividendTime: 4,
            getPrice: 100,
            id: 14,
            priceGets: -2.09,
            quantity: 6,
            sector: 'IT',
            ticker: 'AAPL',
            usdjpy: 133.9,
            user: 'test@test.com',
          },
        ];
        // テスト実行
        const result = await tickerService.fetchTickerList(USER);
        expect(result).toEqual(expected);
      });

      it('ユーザーが株式を保有していない場合、空配列を取得する', async () => {
        // repositoryのモック化
        tickerRepository.fetchTickerList.mockResolvedValue([]);
        // テスト実行
        const result = await tickerService.fetchTickerList(USER);
        expect(result).toEqual([]);
      });
    });
  });

  describe('createTicker', () => {
    describe('正常系', () => {
      it('保有株式の追加が成功し、追加内容を取得する', async () => {
        // repositoryのモック化
        const mockTicker: Readonly<TickerOfRepository> = {
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
        };
        tickerRepository.createTicker.mockResolvedValue(mockTicker);
        // 期待値
        const expected: Readonly<Ticker> = {
          currentPrice: 148.5,
          currentRate: -1.3879,
          dividend: 0.92,
          dividendFirstTime: 2,
          dividendTime: 4,
          getPrice: 100,
          id: 14,
          priceGets: -2.09,
          quantity: 6,
          sector: 'IT',
          ticker: 'AAPL',
          usdjpy: 133.9,
          user: 'test@test.com',
        };
        // リクエストパラメータ
        const createTickerInput: Readonly<CreateTickerInput> = {
          ticker: 'AAPL',
          getPrice: 100,
          quantity: 6,
          user: USER,
          dividend: 0.92,
          dividendFirstTime: 2,
          dividendTime: 4,
          sector: 'IT',
          usdjpy: 133.9,
          currentPrice: 148.5,
          priceGets: -2.09,
          currentRate: -1.3879,
        };
        // テスト実行
        const result = await tickerService.createTicker(createTickerInput);
        expect(result).toEqual(expected);
      });
    });
  });

  describe('updateTicker', () => {
    describe('正常系', () => {
      it('保有株式の更新が成功し、更新後の内容を取得する', async () => {
        // repositoryのモック化
        const mockTicker: Readonly<TickerOfRepository> = {
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
        };
        tickerRepository.updateTicker.mockResolvedValue(mockTicker);
        // 期待値
        const expected: Readonly<Ticker> = {
          currentPrice: 148.5,
          currentRate: -1.3879,
          dividend: 0.92,
          dividendFirstTime: 2,
          dividendTime: 4,
          getPrice: 100,
          id: 14,
          priceGets: -2.09,
          quantity: 6,
          sector: 'IT',
          ticker: 'AAPL',
          usdjpy: 133.9,
          user: 'test@test.com',
        };
        // リクエストパラメータ
        const updateTickerInput: Readonly<UpdateTickerInput> = {
          id: 14,
          getPrice: 100,
          quantity: 6,
          dividend: 0.92,
          usdjpy: 133.9,
          currentPrice: 148.5,
          priceGets: -2.09,
          currentRate: -1.3879,
        };
        // テスト実行
        const result = await tickerService.updateTicker(updateTickerInput);
        expect(result).toEqual(expected);
      });
    });
  });

  describe('deleteTicker', () => {
    describe('正常系', () => {
      it('保有株式の削除が成功し、削除した内容を取得する', async () => {
        // repositoryのモック化
        const mockTicker: Readonly<TickerOfRepository> = {
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
        };
        tickerRepository.deleteTicker.mockResolvedValue(mockTicker);
        // 期待値
        const expected: Readonly<Ticker> = {
          currentPrice: 148.5,
          currentRate: -1.3879,
          dividend: 0.92,
          dividendFirstTime: 2,
          dividendTime: 4,
          getPrice: 100,
          id: 14,
          priceGets: -2.09,
          quantity: 6,
          sector: 'IT',
          ticker: 'AAPL',
          usdjpy: 133.9,
          user: 'test@test.com',
        };
        // リクエストパラメータ
        const updateTickerInput: Readonly<UpdateTickerInput> = {
          id: 14,
          currentPrice: 148.5,
          priceGets: -2.09,
          currentRate: -1.3879,
        };
        // テスト実行
        const result = await tickerService.deleteTicker(updateTickerInput);
        expect(result).toEqual(expected);
      });
    });
  });
});
