import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TickerService } from './ticker.service';
import { TickerRepository } from '@/repositories/ticker/ticker.repository';
import { MarketPriceRepository } from '@/repositories/market-price/market-price.repository';
import { MarketPriceDto } from '@/repositories/market-price/dto/market-price.dto';
import { Ticker } from './dto/types/ticker.type';
import { Ticker as TickerOfRepository } from '@/@generated/prisma-nestjs-graphql/ticker/ticker.model';
import { UpdateTickerInput } from './dto/input/update-ticker.input';
import { CreateTickerDto } from './dto/create-ticker.dto';
import { DividendEntity } from '@/repositories/market-price/entity/dividend.entity';

const mockTickerRepository = () => ({
  fetchTickerList: jest.fn(),
  createTicker: jest.fn(),
  updateTicker: jest.fn(),
  deleteTicker: jest.fn(),
});
const mockMarketPriceRepository = () => ({
  fetchMarketPriceList: jest.fn(),
  fetchDividend: jest.fn(),
});

describe('TickerService', () => {
  let tickerService: TickerService;
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
        TickerService,
      ],
    }).compile();

    tickerService = module.get<TickerService>(TickerService);
    // モック
    tickerRepository = module.get<TickerRepository>(TickerRepository);
    marketPriceRepository = module.get<MarketPriceRepository>(
      MarketPriceRepository,
    );
    const mockDividendEntity: Readonly<DividendEntity> = {
      ticker: 'AAPL',
      dividend: 0.23,
      dividendTotal: 0.92,
      dividendTime: 4,
      dividendMonth: [2, 5, 8, 11],
      dividendFixedMonth: [2, 5, 8, 11],
    };
    marketPriceRepository.fetchDividend.mockResolvedValue(mockDividendEntity);
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
            userId: USER_ID,
            sector: 'IT',
            usdjpy: 133.9,
          },
        ];
        tickerRepository.fetchTickerList.mockResolvedValue(mockTickerList);
        const mockMarketPriceList: Readonly<MarketPriceDto[]> = [
          {
            ticker: 'AAPL',
            currentPrice: 148.5,
            currentRate: -1.3879,
            priceGets: -2.09,
          },
        ];
        marketPriceRepository.fetchMarketPriceList.mockResolvedValue(
          mockMarketPriceList,
        );
        // 期待値
        const expected: Readonly<Ticker[]> = [
          {
            currentPrice: 148.5,
            currentRate: -1.3879,
            getPrice: 100,
            dividend: 0.92,
            id: 14,
            priceGets: -2.09,
            quantity: 6,
            sector: 'IT',
            ticker: 'AAPL',
            usdjpy: 133.9,
          },
        ];
        // テスト実行
        const result = await tickerService.fetchTickerList(USER_ID);
        expect(result).toEqual(expected);
      });

      it('ユーザーが株式を保有していない場合、空配列を取得する', async () => {
        // repositoryのモック化
        tickerRepository.fetchTickerList.mockResolvedValue([]);
        // テスト実行
        const result = await tickerService.fetchTickerList(USER_ID);
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
          userId: USER_ID,
          sector: 'IT',
          usdjpy: 133.9,
        };
        tickerRepository.createTicker.mockResolvedValue(mockTicker);
        const mockMarketPriceList: Readonly<MarketPriceDto[]> = [
          {
            ticker: 'AAPL',
            currentPrice: 148.5,
            currentRate: -1.3879,
            priceGets: -2.09,
          },
        ];
        marketPriceRepository.fetchMarketPriceList.mockResolvedValue(
          mockMarketPriceList,
        );
        // 期待値
        const expected: Readonly<Ticker> = {
          currentPrice: 148.5,
          currentRate: -1.3879,
          dividend: 0.92,
          getPrice: 100,
          id: 14,
          priceGets: -2.09,
          quantity: 6,
          sector: 'IT',
          ticker: 'AAPL',
          usdjpy: 133.9,
        };
        // リクエストパラメータ
        const createTickerDto: Readonly<CreateTickerDto> = {
          ticker: 'AAPL',
          userId: USER_ID,
          getPrice: 100,
          quantity: 6,
          sector: 'IT',
          usdjpy: 133.9,
          currentPrice: 148.5,
          priceGets: -2.09,
          currentRate: -1.3879,
        };
        // テスト実行
        const result = await tickerService.createTicker(createTickerDto);
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
          userId: USER_ID,
          sector: 'IT',
          usdjpy: 133.9,
        };
        tickerRepository.updateTicker.mockResolvedValue(mockTicker);
        // 期待値
        const expected: Readonly<Ticker> = {
          currentPrice: 148.5,
          currentRate: -1.3879,
          getPrice: 100,
          dividend: 0.92,
          id: 14,
          priceGets: -2.09,
          quantity: 6,
          sector: 'IT',
          ticker: 'AAPL',
          usdjpy: 133.9,
        };
        // リクエストパラメータ
        const updateTickerInput: Readonly<UpdateTickerInput> = {
          id: 14,
          getPrice: 100,
          quantity: 6,
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
          userId: USER_ID,
          sector: 'IT',
          usdjpy: 133.9,
        };
        tickerRepository.deleteTicker.mockResolvedValue(mockTicker);
        // 期待値
        const expected: Readonly<Ticker> = {
          currentPrice: 148.5,
          currentRate: -1.3879,
          dividend: 0,
          getPrice: 100,
          id: 14,
          priceGets: -2.09,
          quantity: 6,
          sector: 'IT',
          ticker: 'AAPL',
          usdjpy: 133.9,
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
