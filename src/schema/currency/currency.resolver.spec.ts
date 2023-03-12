import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyResolver } from './currency.resolver';
import { CurrencyService } from './currency.service';

const mockCurrencyService = () => ({
  fetchCurrentUsdJpy: jest.fn(),
});
describe('CurrencyResolver', () => {
  let currencyResolver: CurrencyResolver;
  let currencyService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.example'],
        }),
      ],
      providers: [
        CurrencyResolver,
        {
          provide: CurrencyService,
          useFactory: mockCurrencyService,
        },
      ],
    }).compile();

    currencyResolver = module.get<CurrencyResolver>(CurrencyResolver);
    // モック
    currencyService = module.get<CurrencyService>(CurrencyService);
  });
  describe('getCurrentUsdJpy', () => {
    describe('正常系', () => {
      it('現在のドル円価格を取得する', async () => {
        // サービスのモック化
        const mockUsdJpy = 130.11;
        currencyService.fetchCurrentUsdJpy.mockResolvedValue(mockUsdJpy);
        // テスト実行
        const result = await currencyResolver.getCurrentUsdJpy();
        expect(result).toEqual(mockUsdJpy);
      });
    });
  });
});
