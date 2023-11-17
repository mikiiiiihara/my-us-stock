import { AxiosService } from '@/axios/axios.service';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MarketPriceDto } from './dto/market-price.dto';
import { MarketPriceRepository } from './market-price.repository';
import { DividendEntity } from './entity/dividend.entity';

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
        axiosService.get.mockResolvedValue([
          {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            price: 189.84,
            changesPercentage: 0.0685,
            change: 0.13,
            dayLow: 188.575,
            dayHigh: 190.38,
            yearHigh: 198.23,
            yearLow: 124.17,
            marketCap: 2952543503401,
            priceAvg50: 176.6806,
            priceAvg200: 173.3875,
            exchange: 'NASDAQ',
            volume: 29463629,
            avgVolume: 58857157,
            open: 190.25,
            previousClose: 189.71,
            eps: 6.13,
            pe: 30.97,
            earningsAnnouncement: '2024-01-31T00:00:00.000+0000',
            sharesOutstanding: 15552799744,
            timestamp: 1700248092,
          },
          {
            symbol: 'KO',
            name: 'The Coca-Cola Company',
            price: 57.205,
            changesPercentage: 0.0962,
            change: 0.055,
            dayLow: 56.7,
            dayHigh: 57.25,
            yearHigh: 64.99,
            yearLow: 51.55,
            marketCap: 247320664474,
            priceAvg50: 56.0434,
            priceAvg200: 59.9083,
            exchange: 'NYSE',
            volume: 7826223,
            avgVolume: 14745660,
            open: 57.19,
            previousClose: 57.15,
            eps: 2.47,
            pe: 23.16,
            earningsAnnouncement: '2023-10-24T12:30:00.000+0000',
            sharesOutstanding: 4323409920,
            timestamp: 1700248084,
          },
        ]);
        // 期待値
        const expected: MarketPriceDto[] = [
          {
            ticker: 'AAPL',
            currentPrice: 189.84,
            currentRate: 0.0685,
            priceGets: 0.13,
          },
          {
            currentPrice: 57.205,
            currentRate: 0.0962,
            priceGets: 0.055,
            ticker: 'KO',
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

  describe('fetchDividend', () => {
    describe('正常系', () => {
      it('指定したティッカーの現在の配当情報を取得する(配当頻度が12回)', async () => {
        // モック化
        axiosService.get.mockResolvedValue({
          results: [
            {
              cash_amount: 0.267995,
              currency: 'USD',
              declaration_date: '2023-04-28',
              dividend_type: 'CD',
              ex_dividend_date: '2023-05-01',
              frequency: 12,
              pay_date: '2023-05-05',
              record_date: '2023-05-02',
              ticker: 'TLT',
            },
            {
              cash_amount: 0.268755,
              currency: 'USD',
              declaration_date: '2023-03-31',
              dividend_type: 'CD',
              ex_dividend_date: '2023-04-03',
              frequency: 12,
              pay_date: '2023-04-07',
              record_date: '2023-04-04',
              ticker: 'TLT',
            },
            {
              cash_amount: 0.249766,
              currency: 'USD',
              declaration_date: '2023-02-28',
              dividend_type: 'CD',
              ex_dividend_date: '2023-03-01',
              frequency: 12,
              pay_date: '2023-03-07',
              record_date: '2023-03-02',
              ticker: 'TLT',
            },
            {
              cash_amount: 0.275496,
              currency: 'USD',
              declaration_date: '2023-01-31',
              dividend_type: 'CD',
              ex_dividend_date: '2023-02-01',
              frequency: 12,
              pay_date: '2023-02-07',
              record_date: '2023-02-02',
              ticker: 'TLT',
            },
            {
              cash_amount: 0.261059,
              currency: 'USD',
              declaration_date: '2022-12-14',
              dividend_type: 'CD',
              ex_dividend_date: '2022-12-15',
              frequency: 12,
              pay_date: '2022-12-21',
              record_date: '2022-12-16',
              ticker: 'TLT',
            },
            {
              cash_amount: 0.244243,
              currency: 'USD',
              declaration_date: '2022-11-30',
              dividend_type: 'CD',
              ex_dividend_date: '2022-12-01',
              frequency: 12,
              pay_date: '2022-12-07',
              record_date: '2022-12-02',
              ticker: 'TLT',
            },
            {
              cash_amount: 0.235637,
              currency: 'USD',
              declaration_date: '2022-10-31',
              dividend_type: 'CD',
              ex_dividend_date: '2022-11-01',
              frequency: 12,
              pay_date: '2022-11-07',
              record_date: '2022-11-02',
              ticker: 'TLT',
            },
            {
              cash_amount: 0.244114,
              currency: 'USD',
              declaration_date: '2022-09-30',
              dividend_type: 'CD',
              ex_dividend_date: '2022-10-03',
              frequency: 12,
              pay_date: '2022-10-07',
              record_date: '2022-10-04',
              ticker: 'TLT',
            },
            {
              cash_amount: 0.236135,
              currency: 'USD',
              declaration_date: '2022-08-31',
              dividend_type: 'CD',
              ex_dividend_date: '2022-09-01',
              frequency: 12,
              pay_date: '2022-09-08',
              record_date: '2022-09-02',
              ticker: 'TLT',
            },
            {
              cash_amount: 0.213043,
              currency: 'USD',
              declaration_date: '2022-07-29',
              dividend_type: 'CD',
              ex_dividend_date: '2022-08-01',
              frequency: 12,
              pay_date: '2022-08-05',
              record_date: '2022-08-02',
              ticker: 'TLT',
            },
          ],
          status: 'OK',
          request_id: 'f76fc2ad5ba88c8f67654e187322d476',
          next_url:
            'https://api.polygon.io/v3/reference/dividends?cursor=YXA9MjY1ODEmYXM9JmxpbWl0PTEwJm9yZGVyPWRlc2Mmc29ydD1leF9kaXZpZGVuZF9kYXRlJnRpY2tlcj1UTFQ',
        });
        // 期待値
        const expected: DividendEntity = {
          ticker: 'TLT',
          dividendTime: 12,
          dividend: 0.267995,
          dividendTotal: 3.21594,
          dividendMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          dividendFixedMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        };
        // テスト実行
        const result = await marketPriceRepository.fetchDividend('TLT');
        expect(result).toEqual(expected);
      });

      it('指定したティッカーの現在の配当情報を取得する(配当頻度が4回)', async () => {
        // モック化
        axiosService.get.mockResolvedValue({
          results: [
            {
              cash_amount: 0.24,
              currency: 'USD',
              declaration_date: '2023-05-04',
              dividend_type: 'CD',
              ex_dividend_date: '2023-05-12',
              frequency: 4,
              pay_date: '2023-05-18',
              record_date: '2023-05-15',
              ticker: 'AAPL',
            },
            {
              cash_amount: 0.23,
              currency: 'USD',
              declaration_date: '2023-02-01',
              dividend_type: 'CD',
              ex_dividend_date: '2023-02-10',
              frequency: 4,
              pay_date: '2023-02-16',
              record_date: '2023-02-13',
              ticker: 'AAPL',
            },
            {
              cash_amount: 0.23,
              currency: 'USD',
              declaration_date: '2022-10-27',
              dividend_type: 'CD',
              ex_dividend_date: '2022-11-04',
              frequency: 4,
              pay_date: '2022-11-10',
              record_date: '2022-11-07',
              ticker: 'AAPL',
            },
            {
              cash_amount: 0.23,
              currency: 'USD',
              declaration_date: '2022-07-28',
              dividend_type: 'CD',
              ex_dividend_date: '2022-08-05',
              frequency: 4,
              pay_date: '2022-08-11',
              record_date: '2022-08-08',
              ticker: 'AAPL',
            },
            {
              cash_amount: 0.23,
              currency: 'USD',
              declaration_date: '2022-04-28',
              dividend_type: 'CD',
              ex_dividend_date: '2022-05-06',
              frequency: 4,
              pay_date: '2022-05-12',
              record_date: '2022-05-09',
              ticker: 'AAPL',
            },
            {
              cash_amount: 0.22,
              currency: 'USD',
              declaration_date: '2022-01-27',
              dividend_type: 'CD',
              ex_dividend_date: '2022-02-04',
              frequency: 4,
              pay_date: '2022-02-10',
              record_date: '2022-02-07',
              ticker: 'AAPL',
            },
            {
              cash_amount: 0.22,
              currency: 'USD',
              declaration_date: '2021-10-28',
              dividend_type: 'CD',
              ex_dividend_date: '2021-11-05',
              frequency: 4,
              pay_date: '2021-11-11',
              record_date: '2021-11-08',
              ticker: 'AAPL',
            },
          ],
          status: 'OK',
          request_id: '0347e491fb06d5ef4b3f410a9c818f23',
          next_url:
            'https://api.polygon.io/v3/reference/dividends?cursor=YXA9NzIzNjAmYXM9JmxpbWl0PTEwJm9yZGVyPWRlc2Mmc29ydD1leF9kaXZpZGVuZF9kYXRlJnRpY2tlcj1BQVBM',
        });
        // 期待値
        const expected: DividendEntity = {
          ticker: 'AAPL',
          dividendTime: 4,
          dividend: 0.24,
          dividendTotal: 0.96,
          dividendMonth: [2, 5, 8, 11],
          dividendFixedMonth: [2, 5, 8, 11],
        };
        // テスト実行
        const result = await marketPriceRepository.fetchDividend('AAPL');
        expect(result).toEqual(expected);
      });

      it('指定したティッカーの現在の配当情報を取得する(配当頻度が0回)', async () => {
        // モック化
        axiosService.get.mockResolvedValue({
          results: [],
          status: 'OK',
          request_id: '029d668c896daa77f9df0bb4839f0be6',
        });
        // 期待値
        const expected: DividendEntity = {
          ticker: 'TSLA',
          dividendTime: 0,
          dividendTotal: 0,
          dividendMonth: [],
          dividendFixedMonth: [],
          dividend: 0,
        };
        // テスト実行
        const result = await marketPriceRepository.fetchDividend('TSLA');
        expect(result).toEqual(expected);
      });
    });
  });
});
