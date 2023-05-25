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
          dividend: 3.21594,
          dividendFirstTime: 1,
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
            {
              cash_amount: 0.22,
              currency: 'USD',
              declaration_date: '2021-07-27',
              dividend_type: 'CD',
              ex_dividend_date: '2021-08-06',
              frequency: 4,
              pay_date: '2021-08-12',
              record_date: '2021-08-09',
              ticker: 'AAPL',
            },
            {
              cash_amount: 0.22,
              currency: 'USD',
              declaration_date: '2021-04-28',
              dividend_type: 'CD',
              ex_dividend_date: '2021-05-07',
              frequency: 4,
              pay_date: '2021-05-13',
              record_date: '2021-05-10',
              ticker: 'AAPL',
            },
            {
              cash_amount: 0.205,
              currency: 'USD',
              declaration_date: '2021-01-27',
              dividend_type: 'CD',
              ex_dividend_date: '2021-02-05',
              frequency: 4,
              pay_date: '2021-02-11',
              record_date: '2021-02-08',
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
          dividend: 0.96,
          dividendFirstTime: 2,
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
          dividendFirstTime: 0,
          dividend: 0,
        };
        // テスト実行
        const result = await marketPriceRepository.fetchDividend('TSLA');
        expect(result).toEqual(expected);
      });
    });
  });
});
