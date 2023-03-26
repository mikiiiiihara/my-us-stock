import { CurrencyRepository } from '@/repositories/currency/currency.repository';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from './currency.service';

const mockCurrencyRepository = () => ({
  fetchCurrentUsdJpy: jest.fn(),
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
        currencyRepository.fetchCurrentUsdJpy.mockResolvedValue(133.69);
        // テスト実行
        const result = await currencyService.fetchCurrentUsdJpy();
        expect(result).toEqual(133.69);
      });
    });
  });
});
