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

    describe('異常系', () => {
      it('指定したティッカーが実際に存在しない', async () => {
        // モック化
        axiosService.get.mockResolvedValue([]);
        // リクエストパラメータ
        const ticker = 'AAPLKK';
        // テスト実行
        const test = () => marketPriceRepository.fetchMarketPriceList([ticker]);
        await expect(test).rejects.toThrow(
          new Error('入力された銘柄のデータは存在しません。'),
        );
      });
    });
  });

  describe('fetchDividend', () => {
    describe('正常系', () => {
      it('指定したティッカーの現在の配当情報を取得する(配当頻度が12回)', async () => {
        // モック化
        axiosService.get.mockResolvedValue({
          symbol: 'TLT',
          historical: [
            {
              date: '2023-11-01',
              label: 'November 01, 23',
              adjDividend: 0.286,
              dividend: 0.286,
              recordDate: '2023-11-02',
              paymentDate: '2023-11-07',
              declarationDate: '2023-10-31',
            },
            {
              date: '2023-10-02',
              label: 'October 02, 23',
              adjDividend: 0.28,
              dividend: 0.28,
              recordDate: '2023-10-03',
              paymentDate: '2023-10-06',
              declarationDate: '2023-09-29',
            },
            {
              date: '2023-09-01',
              label: 'September 01, 23',
              adjDividend: 0.289,
              dividend: 0.289,
              recordDate: '2023-09-05',
              paymentDate: '2023-09-08',
              declarationDate: '2023-08-31',
            },
            {
              date: '2023-08-01',
              label: 'August 01, 23',
              adjDividend: 0.275,
              dividend: 0.275,
              recordDate: '2023-08-02',
              paymentDate: '2023-08-07',
              declarationDate: '2023-07-31',
            },
            {
              date: '2023-07-03',
              label: 'July 03, 23',
              adjDividend: 0.278,
              dividend: 0.278,
              recordDate: '2023-07-05',
              paymentDate: '2023-07-10',
              declarationDate: '2023-06-30',
            },
            {
              date: '2023-06-01',
              label: 'June 01, 23',
              adjDividend: 0.273,
              dividend: 0.273,
              recordDate: '2023-06-02',
              paymentDate: '2023-06-07',
              declarationDate: '2023-05-31',
            },
            {
              date: '2023-05-01',
              label: 'May 01, 23',
              adjDividend: 0.268,
              dividend: 0.268,
              recordDate: '2023-05-02',
              paymentDate: '2023-05-05',
              declarationDate: '2023-04-28',
            },
            {
              date: '2023-04-03',
              label: 'April 03, 23',
              adjDividend: 0.269,
              dividend: 0.269,
              recordDate: '2023-04-04',
              paymentDate: '2023-04-07',
              declarationDate: '2023-03-31',
            },
            {
              date: '2023-03-01',
              label: 'March 01, 23',
              adjDividend: 0.25,
              dividend: 0.25,
              recordDate: '2023-03-02',
              paymentDate: '2023-03-07',
              declarationDate: '2023-02-28',
            },
            {
              date: '2023-02-01',
              label: 'February 01, 23',
              adjDividend: 0.275,
              dividend: 0.275,
              recordDate: '2023-02-02',
              paymentDate: '2023-02-07',
              declarationDate: '2023-01-31',
            },
            {
              date: '2022-12-15',
              label: 'December 15, 22',
              adjDividend: 0.261,
              dividend: 0.261,
              recordDate: '2022-12-16',
              paymentDate: '2022-12-21',
              declarationDate: '2022-12-14',
            },
            {
              date: '2022-12-01',
              label: 'December 01, 22',
              adjDividend: 0.244,
              dividend: 0.244,
              recordDate: '2022-12-02',
              paymentDate: '2022-12-07',
              declarationDate: '2022-11-30',
            },
            {
              date: '2022-11-01',
              label: 'November 01, 22',
              adjDividend: 0.236,
              dividend: 0.236,
              recordDate: '2022-11-02',
              paymentDate: '2022-11-07',
              declarationDate: '2022-10-31',
            },
            {
              date: '2022-10-03',
              label: 'October 03, 22',
              adjDividend: 0.244,
              dividend: 0.244,
              recordDate: '2022-10-04',
              paymentDate: '2022-10-07',
              declarationDate: '2022-09-30',
            },
            {
              date: '2022-09-01',
              label: 'September 01, 22',
              adjDividend: 0.236,
              dividend: 0.236,
              recordDate: '2022-09-02',
              paymentDate: '2022-09-08',
              declarationDate: '2022-08-31',
            },
          ],
        });
        // 期待値
        const expected: DividendEntity = {
          ticker: 'TLT',
          dividendTime: 12,
          dividend: 0.271,
          dividendTotal: 3.252,
          dividendMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          dividendFixedMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        };
        // テスト実行
        const result = await marketPriceRepository.fetchDividend('TLT');
        expect(result).toEqual(expected);
      });

      it('指定したティッカーの現在の配当情報を取得する(配当頻度が12回)', async () => {
        // モック化
        axiosService.get.mockResolvedValue({
          symbol: 'TLT',
          historical: [
            {
              date: '2023-11-01',
              label: 'November 01, 23',
              adjDividend: 0.286,
              dividend: 0.286,
              recordDate: '2023-11-02',
              paymentDate: '2023-11-07',
              declarationDate: '2023-10-31',
            },
            {
              date: '2023-10-02',
              label: 'October 02, 23',
              adjDividend: 0.28,
              dividend: 0.28,
              recordDate: '2023-10-03',
              paymentDate: '2023-10-06',
              declarationDate: '2023-09-29',
            },
            {
              date: '2023-09-01',
              label: 'September 01, 23',
              adjDividend: 0.289,
              dividend: 0.289,
              recordDate: '2023-09-05',
              paymentDate: '2023-09-08',
              declarationDate: '2023-08-31',
            },
            {
              date: '2023-08-01',
              label: 'August 01, 23',
              adjDividend: 0.275,
              dividend: 0.275,
              recordDate: '2023-08-02',
              paymentDate: '2023-08-07',
              declarationDate: '2023-07-31',
            },
            {
              date: '2023-07-03',
              label: 'July 03, 23',
              adjDividend: 0.278,
              dividend: 0.278,
              recordDate: '2023-07-05',
              paymentDate: '2023-07-10',
              declarationDate: '2023-06-30',
            },
            {
              date: '2023-06-01',
              label: 'June 01, 23',
              adjDividend: 0.273,
              dividend: 0.273,
              recordDate: '2023-06-02',
              paymentDate: '2023-06-07',
              declarationDate: '2023-05-31',
            },
            {
              date: '2023-05-01',
              label: 'May 01, 23',
              adjDividend: 0.268,
              dividend: 0.268,
              recordDate: '2023-05-02',
              paymentDate: '2023-05-05',
              declarationDate: '2023-04-28',
            },
            {
              date: '2023-04-03',
              label: 'April 03, 23',
              adjDividend: 0.269,
              dividend: 0.269,
              recordDate: '2023-04-04',
              paymentDate: '2023-04-07',
              declarationDate: '2023-03-31',
            },
            {
              date: '2023-03-01',
              label: 'March 01, 23',
              adjDividend: 0.25,
              dividend: 0.25,
              recordDate: '2023-03-02',
              paymentDate: '2023-03-07',
              declarationDate: '2023-02-28',
            },
            {
              date: '2023-02-01',
              label: 'February 01, 23',
              adjDividend: 0.275,
              dividend: 0.275,
              recordDate: '2023-02-02',
              paymentDate: '2023-02-07',
              declarationDate: '2023-01-31',
            },
            {
              date: '2022-12-15',
              label: 'December 15, 22',
              adjDividend: 0.261,
              dividend: 0.261,
              recordDate: '2022-12-16',
              paymentDate: '2022-12-21',
              declarationDate: '2022-12-14',
            },
            {
              date: '2022-12-01',
              label: 'December 01, 22',
              adjDividend: 0.244,
              dividend: 0.244,
              recordDate: '2022-12-02',
              paymentDate: '2022-12-07',
              declarationDate: '2022-11-30',
            },
            {
              date: '2022-11-01',
              label: 'November 01, 22',
              adjDividend: 0.236,
              dividend: 0.236,
              recordDate: '2022-11-02',
              paymentDate: '2022-11-07',
              declarationDate: '2022-10-31',
            },
            {
              date: '2022-10-03',
              label: 'October 03, 22',
              adjDividend: 0.244,
              dividend: 0.244,
              recordDate: '2022-10-04',
              paymentDate: '2022-10-07',
              declarationDate: '2022-09-30',
            },
            {
              date: '2022-09-01',
              label: 'September 01, 22',
              adjDividend: 0.236,
              dividend: 0.236,
              recordDate: '2022-09-02',
              paymentDate: '2022-09-08',
              declarationDate: '2022-08-31',
            },
          ],
        });
        // 期待値
        const expected: DividendEntity = {
          ticker: 'TLT',
          dividendTime: 12,
          dividend: 0.271,
          dividendTotal: 3.252,
          dividendMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          dividendFixedMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        };
        // テスト実行
        const result = await marketPriceRepository.fetchDividend('TLT');
        expect(result).toEqual(expected);
      });

      it('配当権利落月が取得できない場合、無配当扱いになる。', async () => {
        // モック化
        axiosService.get.mockResolvedValue({
          symbol: 'AAPL',
          historical: [
            {
              date: '', // 情報が存在しない場合、空配列で返却される
              label: 'November 10, 23',
              adjDividend: 0.24,
              dividend: 0.24,
              recordDate: '2023-11-13',
              paymentDate: '2023-11-07',
              declarationDate: '2023-11-02',
            },
            {
              date: '2023-08-11',
              label: 'August 11, 23',
              adjDividend: 0.24,
              dividend: 0.24,
              recordDate: '2023-08-14',
              paymentDate: '2023-08-17',
              declarationDate: '2023-08-03',
            },
            {
              date: '2023-05-12',
              label: 'May 12, 23',
              adjDividend: 0.24,
              dividend: 0.24,
              recordDate: '2023-05-15',
              paymentDate: '2023-05-18',
              declarationDate: '2023-05-04',
            },
            {
              date: '2023-02-10',
              label: 'February 10, 23',
              adjDividend: 0.23,
              dividend: 0.23,
              recordDate: '2022-12-28',
              paymentDate: '2023-02-16',
              declarationDate: '2022-12-19',
            },
            {
              date: '2022-11-04',
              label: 'November 04, 22',
              adjDividend: 0.23,
              dividend: 0.23,
              recordDate: '2022-11-07',
              paymentDate: '2022-11-10',
              declarationDate: '2022-10-27',
            },
          ],
        });
        // 期待値
        const expected: DividendEntity = {
          ticker: 'AAPL',
          dividendTime: 4,
          dividend: 0.238,
          dividendTotal: 0.952,
          dividendMonth: [2, 5, 8, 11],
          dividendFixedMonth: [],
        };
        // テスト実行
        const result = await marketPriceRepository.fetchDividend('AAPL');
        expect(result).toEqual(expected);
      });

      it('配当付与月が取得できない場合、無配当扱いになる。', async () => {
        // モック化
        axiosService.get.mockResolvedValue({
          symbol: 'AAPL',
          historical: [
            {
              date: '2023-11-10',
              label: 'November 10, 23',
              adjDividend: 0.24,
              dividend: 0.24,
              recordDate: '2023-11-13',
              paymentDate: '', // 情報が存在しない場合、空配列で返却される
              declarationDate: '2023-11-02',
            },
            {
              date: '2023-08-11',
              label: 'August 11, 23',
              adjDividend: 0.24,
              dividend: 0.24,
              recordDate: '2023-08-14',
              paymentDate: '2023-08-17',
              declarationDate: '2023-08-03',
            },
            {
              date: '2023-05-12',
              label: 'May 12, 23',
              adjDividend: 0.24,
              dividend: 0.24,
              recordDate: '2023-05-15',
              paymentDate: '2023-05-18',
              declarationDate: '2023-05-04',
            },
            {
              date: '2023-02-10',
              label: 'February 10, 23',
              adjDividend: 0.23,
              dividend: 0.23,
              recordDate: '2022-12-28',
              paymentDate: '2023-02-16',
              declarationDate: '2022-12-19',
            },
            {
              date: '2022-11-04',
              label: 'November 04, 22',
              adjDividend: 0.23,
              dividend: 0.23,
              recordDate: '2022-11-07',
              paymentDate: '2022-11-10',
              declarationDate: '2022-10-27',
            },
          ],
        });
        // 期待値
        const expected: DividendEntity = {
          ticker: 'AAPL',
          dividendTime: 4,
          dividend: 0.238,
          dividendTotal: 0.952,
          dividendMonth: [],
          dividendFixedMonth: [2, 5, 8, 11],
        };
        // テスト実行
        const result = await marketPriceRepository.fetchDividend('AAPL');
        expect(result).toEqual(expected);
      });

      it('指定したティッカーの現在の配当情報を取得する(配当頻度が4回)', async () => {
        // モック化
        axiosService.get.mockResolvedValue({
          symbol: 'AAPL',
          historical: [
            {
              date: '2023-11-10',
              label: 'November 10, 23',
              adjDividend: 0.24,
              dividend: 0.24,
              recordDate: '2023-11-13',
              paymentDate: '2023-11-16',
              declarationDate: '2023-11-02',
            },
            {
              date: '2023-08-11',
              label: 'August 11, 23',
              adjDividend: 0.24,
              dividend: 0.24,
              recordDate: '2023-08-14',
              paymentDate: '2023-08-17',
              declarationDate: '2023-08-03',
            },
            {
              date: '2023-05-12',
              label: 'May 12, 23',
              adjDividend: 0.24,
              dividend: 0.24,
              recordDate: '2023-05-15',
              paymentDate: '2023-05-18',
              declarationDate: '2023-05-04',
            },
            {
              date: '2023-02-10',
              label: 'February 10, 23',
              adjDividend: 0.23,
              dividend: 0.23,
              recordDate: '2022-12-28',
              paymentDate: '2023-02-16',
              declarationDate: '2022-12-19',
            },
            {
              date: '2022-11-04',
              label: 'November 04, 22',
              adjDividend: 0.23,
              dividend: 0.23,
              recordDate: '2022-11-07',
              paymentDate: '2022-11-10',
              declarationDate: '2022-10-27',
            },
          ],
        });
        // 期待値
        const expected: DividendEntity = {
          ticker: 'AAPL',
          dividendTime: 4,
          dividend: 0.238,
          dividendTotal: 0.952,
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
          symbol: 'TSLA',
          historical: [],
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
