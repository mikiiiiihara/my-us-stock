import { CurrencyRepository } from '@/repositories/currency/currency.repository';
import { CurrencyPair } from '@/repositories/currency/dto/fx.dto';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from './currency.service';

const mockCurrencyRepository = () => ({
  fetchCurrencyPair: jest.fn(),
});
describe('CurrencyService', () => {
  let currencyService: CurrencyService;
  let currencyRepository: any;

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
          provide: CurrencyRepository,
          useFactory: mockCurrencyRepository,
        },
        CurrencyService,
      ],
    }).compile();

    currencyService = module.get<CurrencyService>(CurrencyService);
    // モック
    currencyRepository = module.get<CurrencyRepository>(CurrencyRepository);
  });
  describe('fetchCurrentUsdJpy', () => {
    describe('正常系', () => {
      it('現在のドル円価格を取得する', async () => {
        // repositoryのモック化
        const mockAssetList: Readonly<CurrencyPair[]> = [
          {
            high: '0.6121',
            open: '0.6121',
            bid: '0.6121',
            currencyPairCode: 'NZDUSD',
            ask: '0.6134',
            low: '0.6121',
          },
          {
            high: '134.96',
            open: '134.96',
            bid: '134.96',
            currencyPairCode: 'USDJPY',
            ask: '135.07',
            low: '134.96',
          },
        ];
        currencyRepository.fetchCurrencyPair.mockResolvedValue(mockAssetList);
        // テスト実行
        const result = await currencyService.fetchCurrentUsdJpy();
        expect(result).toEqual(134.96);
      });
    });
  });
});
