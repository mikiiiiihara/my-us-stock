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
          quoteResponse: {
            result: [
              {
                language: 'en-US',
                region: 'US',
                quoteType: 'EQUITY',
                typeDisp: 'Equity',
                quoteSourceName: 'Nasdaq Real Time Price',
                triggerable: true,
                customPriceAlertConfidence: 'HIGH',
                currency: 'USD',
                exchange: 'NMS',
                shortName: 'Apple Inc.',
                longName: 'Apple Inc.',
                messageBoardId: 'finmb_24937',
                exchangeTimezoneName: 'America/New_York',
                exchangeTimezoneShortName: 'EDT',
                gmtOffSetMilliseconds: -14400000,
                market: 'us_market',
                esgPopulated: false,
                marketState: 'PRE',
                priceHint: 2,
                preMarketChange: -1.0999908,
                preMarketChangePercent: -0.6717091,
                preMarketTime: 1680773148,
                preMarketPrice: 162.66,
                ask: 0.0,
                bidSize: 8,
                askSize: 22,
                fullExchangeName: 'NasdaqGS',
                financialCurrency: 'USD',
                regularMarketOpen: 164.74,
                averageDailyVolume3Month: 66485773,
                averageDailyVolume10Day: 54941490,
                regularMarketChangePercent: -1.1290288,
                regularMarketPrice: 163.76,
                earningsTimestamp: 1675375200,
                earningsTimestampStart: 1682506740,
                earningsTimestampEnd: 1682942400,
                trailingAnnualDividendRate: 0.91,
                trailingPE: 27.75593,
                trailingAnnualDividendYield: 0.0054941736,
                epsTrailingTwelveMonths: 5.9,
                epsForward: 6.59,
                epsCurrentYear: 5.96,
                priceEpsCurrentYear: 27.47651,
                sharesOutstanding: 15821899776,
                bookValue: 3.581,
                fiftyDayAverage: 152.9438,
                fiftyDayAverageChange: 10.816193,
                fiftyDayAverageChangePercent: 0.07072005,
                twoHundredDayAverage: 148.9908,
                twoHundredDayAverageChange: 14.769196,
                twoHundredDayAverageChangePercent: 0.09912824,
                marketCap: 2620585672704,
                forwardPE: 24.849771,
                priceToBook: 45.73024,
                sourceInterval: 15,
                exchangeDataDelayedBy: 0,
                averageAnalystRating: '2.0 - Buy',
                tradeable: false,
                cryptoTradeable: false,
                fiftyTwoWeekLowChange: 39.589996,
                fiftyTwoWeekLowChangePercent: 0.31883705,
                fiftyTwoWeekRange: '124.17 - 176.15',
                fiftyTwoWeekHighChange: -12.389999,
                fiftyTwoWeekHighChangePercent: -0.07033778,
                fiftyTwoWeekLow: 124.17,
                fiftyTwoWeekHigh: 176.15,
                dividendDate: 1676505600,
                regularMarketChange: -1.8700104,
                regularMarketTime: 1680724804,
                regularMarketDayHigh: 165.05,
                regularMarketDayRange: '161.8 - 165.05',
                regularMarketDayLow: 161.8,
                regularMarketVolume: 50263014,
                regularMarketPreviousClose: 165.63,
                bid: 0.0,
                firstTradeDateMilliseconds: 345479400000,
                displayName: 'Apple',
                symbol: 'AAPL',
              },
              {
                language: 'en-US',
                region: 'US',
                quoteType: 'EQUITY',
                typeDisp: 'Equity',
                quoteSourceName: 'Nasdaq Real Time Price',
                triggerable: true,
                customPriceAlertConfidence: 'HIGH',
                currency: 'USD',
                exchange: 'NYQ',
                shortName: 'Coca-Cola Company (The)',
                longName: 'The Coca-Cola Company',
                messageBoardId: 'finmb_26642',
                exchangeTimezoneName: 'America/New_York',
                exchangeTimezoneShortName: 'EDT',
                gmtOffSetMilliseconds: -14400000,
                market: 'us_market',
                esgPopulated: false,
                marketState: 'PRE',
                priceHint: 2,
                preMarketChange: -0.040000916,
                preMarketChangePercent: -0.06369573,
                preMarketTime: 1680772841,
                preMarketPrice: 62.76,
                ask: 62.77,
                bidSize: 18,
                askSize: 30,
                fullExchangeName: 'NYSE',
                financialCurrency: 'USD',
                regularMarketOpen: 62.53,
                averageDailyVolume3Month: 13987180,
                averageDailyVolume10Day: 12243180,
                regularMarketChangePercent: 0.9484008,
                regularMarketPrice: 62.8,
                earningsTimestamp: 1682339400,
                earningsTimestampStart: 1682339400,
                earningsTimestampEnd: 1682339400,
                trailingAnnualDividendRate: 1.76,
                trailingPE: 28.675798,
                trailingAnnualDividendYield: 0.028291272,
                epsTrailingTwelveMonths: 2.19,
                epsForward: 2.8,
                epsCurrentYear: 2.59,
                priceEpsCurrentYear: 24.247105,
                sharesOutstanding: 4326309888,
                bookValue: 5.57,
                fiftyDayAverage: 60.3678,
                fiftyDayAverageChange: 2.4321976,
                fiftyDayAverageChangePercent: 0.040289648,
                twoHundredDayAverage: 61.09965,
                twoHundredDayAverageChange: 1.7003479,
                twoHundredDayAverageChangePercent: 0.027829094,
                marketCap: 271692251136,
                forwardPE: 22.428572,
                priceToBook: 11.274685,
                sourceInterval: 15,
                exchangeDataDelayedBy: 0,
                averageAnalystRating: '2.1 - Buy',
                tradeable: false,
                cryptoTradeable: false,
                fiftyTwoWeekLowChange: 8.779999,
                fiftyTwoWeekLowChangePercent: 0.16253237,
                fiftyTwoWeekRange: '54.02 - 67.2',
                fiftyTwoWeekHighChange: -4.3999977,
                fiftyTwoWeekHighChangePercent: -0.06547616,
                fiftyTwoWeekLow: 54.02,
                fiftyTwoWeekHigh: 67.2,
                dividendDate: 1680480000,
                regularMarketChange: 0.59000015,
                regularMarketTime: 1680724802,
                regularMarketDayHigh: 63.02,
                regularMarketDayRange: '62.5 - 63.02',
                regularMarketDayLow: 62.5,
                regularMarketVolume: 12662543,
                regularMarketPreviousClose: 62.21,
                bid: 62.72,
                firstTradeDateMilliseconds: -252322200000,
                symbol: 'KO',
              },
            ],
            error: null,
          },
        });
        // 期待値
        const expected: MarketPriceDto[] = [
          {
            ticker: 'AAPL',
            currentPrice: 163.76,
            currentRate: -1.1290288,
            priceGets: -1.8700104,
          },
          {
            currentPrice: 62.8,
            currentRate: 0.9484008,
            priceGets: 0.59000015,
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
});
