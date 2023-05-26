import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTickerInput } from './dto/input/create-ticker.input';
import { UpdateTickerInput } from './dto/input/update-ticker.input';
import { Ticker } from './dto/types/ticker.type';
import { TickerResolver } from './ticker.resolver';
import { TickerService } from './ticker.service';

const mockTickerService = () => ({
  fetchTickerList: jest.fn(),
  createTicker: jest.fn(),
  updateTicker: jest.fn(),
  deleteTicker: jest.fn(),
});
describe('TickerResolver', () => {
  let tickerResolver: TickerResolver;
  let tickerService: any;

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
        TickerResolver,
        {
          provide: TickerService,
          useFactory: mockTickerService,
        },
      ],
    }).compile();

    tickerResolver = module.get<TickerResolver>(TickerResolver);
    // モック
    tickerService = module.get<TickerService>(TickerService);
  });
  describe('getTickers', () => {
    describe('正常系', () => {
      it('ユーザーに紐付く保有株式情報を取得する', async () => {
        // サービスのモック化
        const mockTickerList: Readonly<Ticker[]> = [
          {
            id: 14,
            ticker: 'AAPL',
            getPrice: 100,
            dividend: 0.92,
            quantity: 6,
            sector: 'IT',
            usdjpy: 133.9,
            currentPrice: 148.5,
            priceGets: -2.09,
            currentRate: -1.3879,
          },
        ];
        tickerService.fetchTickerList.mockResolvedValue(mockTickerList);
        // テスト実行
        const result = await tickerResolver.getTickers(USER_ID);
        expect(result).toEqual(mockTickerList);
      });
    });
  });

  describe('createTicker', () => {
    describe('正常系', () => {
      it('保有株式の追加が成功し、追加内容を取得する', async () => {
        // サービスのモック化
        const mockTicker: Readonly<Ticker> = {
          id: 14,
          ticker: 'AAPL',
          dividend: 0.92,
          getPrice: 100,
          quantity: 6,
          sector: 'IT',
          usdjpy: 133.9,
          currentPrice: 148.5,
          priceGets: -2.09,
          currentRate: -1.3879,
        };
        tickerService.createTicker.mockResolvedValue(mockTicker);
        // リクエストパラメータ
        const createTickerInput: Readonly<CreateTickerInput> = {
          ticker: 'AAPL',
          getPrice: 100,
          quantity: 6,
          sector: 'IT',
          usdjpy: 133.9,
          currentPrice: 148.5,
          priceGets: -2.09,
          currentRate: -1.3879,
        };
        // テスト実行
        const result = await tickerResolver.createTicker(
          USER_ID,
          createTickerInput,
        );
        expect(result).toEqual(mockTicker);
      });
    });
  });
  describe('updateTicker', () => {
    describe('正常系', () => {
      it('保有株式の更新が成功し、更新後の内容を取得する', async () => {
        // サービスのモック化
        const mockTicker: Readonly<Ticker> = {
          id: 14,
          ticker: 'AAPL',
          getPrice: 100,
          dividend: 0.92,
          quantity: 6,
          sector: 'IT',
          usdjpy: 133.9,
          currentPrice: 148.5,
          priceGets: -2.09,
          currentRate: -1.3879,
        };
        tickerService.updateTicker.mockResolvedValue(mockTicker);
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
        const result = await tickerResolver.updateTicker(updateTickerInput);
        expect(result).toEqual(mockTicker);
      });
    });
  });

  describe('deleteTicker', () => {
    describe('正常系', () => {
      it('保有株式の削除が成功し、削除した内容を取得する', async () => {
        // サービスのモック化
        const mockTicker: Readonly<Ticker> = {
          id: 14,
          ticker: 'AAPL',
          getPrice: 100,
          dividend: 0.92,
          quantity: 6,
          sector: 'IT',
          usdjpy: 133.9,
          currentPrice: 148.5,
          priceGets: -2.09,
          currentRate: -1.3879,
        };
        tickerService.deleteTicker.mockResolvedValue(mockTicker);
        // リクエストパラメータ
        const updateTickerInput: Readonly<UpdateTickerInput> = {
          id: 14,
          currentPrice: 148.5,
          priceGets: -2.09,
          currentRate: -1.3879,
        };
        // テスト実行
        const result = await tickerResolver.deleteTicker(updateTickerInput);
        expect(result).toEqual(mockTicker);
      });
    });
  });
});
