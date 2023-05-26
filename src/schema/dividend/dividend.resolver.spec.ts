import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DividendResolver } from './dividend.resolver';
import { DividendService } from './dividend.service';
import { Dividend } from './types/dividend.type';

const mockDividendService = () => ({
  getDividendList: jest.fn(),
});
describe('DividendResolver', () => {
  let dividendResolver: DividendResolver;
  let dividendService: any;

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
        DividendResolver,
        {
          provide: DividendService,
          useFactory: mockDividendService,
        },
      ],
    }).compile();

    dividendResolver = module.get<DividendResolver>(DividendResolver);
    // モック
    dividendService = module.get<DividendService>(DividendService);
  });
  describe('getDividendList', () => {
    describe('正常系', () => {
      it('ユーザーに紐付く保有株式の配当情報を取得する', async () => {
        // サービスのモック化
        const mockDividendList: Readonly<Dividend[]> = [
          {
            ticker: 'AAPL',
            quantity: 6,
            dividend: 0.23,
            dividendTotal: 0.92,
            dividendTime: 4,
            dividendMonth: [2, 5, 8, 11],
          },
        ];
        dividendService.getDividendList.mockResolvedValue(mockDividendList);
        // テスト実行
        const result = await dividendResolver.getDividendList(USER_ID);
        expect(result).toEqual(mockDividendList);
      });
    });
  });
});
