import { PrismaService } from '@/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTickerDto } from './dto/create-ticker.dto';
import { TickerRepository } from './ticker.repository';
import { UpdateTickerDto } from './dto/update-ticker.dto';
import { migrateResetTest } from '@/prisma/prisma.util';
import { Ticker } from '@/@generated/prisma-nestjs-graphql/ticker/ticker.model';

describe('TickerRepository', () => {
  let tickerRepository: TickerRepository;
  let prismaService: PrismaService;

  // ユーザー
  const USER_ID = 9;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.example'],
        }),
      ],
      providers: [TickerRepository, PrismaService],
    }).compile();

    tickerRepository = module.get<TickerRepository>(TickerRepository);
    prismaService = module.get<PrismaService>(PrismaService);
    // DBリセット
    await migrateResetTest();
    // DB登録
    const tickers: CreateTickerDto[] = [
      {
        ticker: 'AAPL',
        getPrice: 100,
        quantity: 6,
        userId: USER_ID,
        dividend: 0.92,
        dividendTime: 4,
        dividendFirstTime: 2,
        sector: 'IT',
        usdjpy: 133.9,
      },
      {
        ticker: 'HSBC',
        getPrice: 36.5,
        quantity: 10,
        userId: USER_ID,
        dividend: 1.5,
        dividendTime: 4,
        dividendFirstTime: 2,
        sector: 'financials',
        usdjpy: 134,
      },
    ];
    await prismaService.ticker.createMany({ data: tickers });
  });
  describe('fetchTickerList', () => {
    describe('正常系', () => {
      it('ユーザーに紐付く保有株式情報を取得する', async () => {
        // 期待値
        const expected: Ticker[] = [
          {
            id: 1,
            ticker: 'AAPL',
            getPrice: 100,
            quantity: 6,
            userId: USER_ID,
            dividend: 0.92,
            dividendTime: 4,
            dividendFirstTime: 2,
            sector: 'IT',
            usdjpy: 133.9,
          },
          {
            id: 2,
            ticker: 'HSBC',
            getPrice: 36.5,
            quantity: 10,
            userId: USER_ID,
            dividend: 1.5,
            dividendTime: 4,
            dividendFirstTime: 2,
            sector: 'financials',
            usdjpy: 134,
          },
        ];
        // テスト実行
        const result = await tickerRepository.fetchTickerList(USER_ID);
        expect(result).toEqual(expected);
      });
    });
  });

  describe('createTicker', () => {
    describe('正常系', () => {
      it('保有株式情報を追加し、追加した内容を取得する', async () => {
        // 期待値
        const expected: Ticker = {
          id: 3,
          ticker: 'VT',
          getPrice: 90,
          quantity: 6,
          userId: USER_ID,
          dividend: 2.68,
          dividendTime: 4,
          dividendFirstTime: 3,
          sector: 'index',
          usdjpy: 133,
        };
        // リクエストパラメータ
        const createTickerDto: CreateTickerDto = {
          ticker: 'VT',
          getPrice: 90,
          quantity: 6,
          userId: USER_ID,
          dividend: 2.68,
          dividendTime: 4,
          dividendFirstTime: 3,
          sector: 'index',
          usdjpy: 133,
        };
        // テスト実行
        const result = await tickerRepository.createTicker(createTickerDto);
        expect(result).toEqual(expected);
        // 登録したデータを削除する
        await prismaService.ticker.delete({
          where: {
            id: 3,
          },
        });
      });
    });
  });
  describe('updateTicker', () => {
    describe('正常系', () => {
      it('保有株式情報を更新し、更新した内容を取得する', async () => {
        // 期待値
        const expected: Ticker = {
          id: 1,
          ticker: 'AAPL',
          getPrice: 100,
          quantity: 10,
          userId: USER_ID,
          dividend: 0.92,
          dividendTime: 4,
          dividendFirstTime: 2,
          sector: 'IT',
          usdjpy: 134.9,
        };
        // リクエストパラメータ
        const updateTickerDto: UpdateTickerDto = {
          id: 1,
          quantity: 10,
          usdjpy: 134.9,
        };
        // テスト実行
        const result = await tickerRepository.updateTicker(updateTickerDto);
        expect(result).toEqual(expected);
      });
    });
  });
  describe('deleteTicker', () => {
    describe('正常系', () => {
      it('保有株式情報を更新し、更新した内容を取得する', async () => {
        // 期待値
        const expected: Ticker = {
          id: 1,
          ticker: 'AAPL',
          getPrice: 100,
          quantity: 6,
          userId: USER_ID,
          dividend: 0.92,
          dividendTime: 4,
          dividendFirstTime: 2,
          sector: 'IT',
          usdjpy: 133.9,
        };
        // テスト実行
        const result = await tickerRepository.deleteTicker(1);
        expect(result).toEqual(expected);
      });
    });
  });
});
