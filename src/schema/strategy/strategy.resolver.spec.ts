import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateStrategyInput } from './dto/input/update-strategy.input';
import { Strategy } from './dto/types/strategy.type';
import { StrategyResolver } from './strategy.resolver';
import { StrategyService } from './strategy.service';

const mockTickerService = () => ({
  fetchStrategy: jest.fn(),
  updateStrategy: jest.fn(),
});
describe('StrategyResolver', () => {
  let strategyResolver: StrategyResolver;
  let strategyService: any;

  // ユーザー
  const USER = 'test@test.com';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.example'],
        }),
      ],
      providers: [
        StrategyResolver,
        {
          provide: StrategyService,
          useFactory: mockTickerService,
        },
      ],
    }).compile();

    strategyResolver = module.get<StrategyResolver>(StrategyResolver);
    // モック
    strategyService = module.get<StrategyService>(StrategyService);
  });
  describe('getStrategy', () => {
    describe('正常系', () => {
      it('ユーザーに紐付く投資戦略メモを取得する', async () => {
        // サービスのモック化
        const mockStrategy: Readonly<Strategy> = {
          id: 1,
          user: USER,
          text: 'テスト',
          addDate: '20220827',
          updDate: '20220827',
        };
        strategyService.fetchStrategy.mockResolvedValue(mockStrategy);
        // テスト実行
        const result = await strategyResolver.getStrategy(USER);
        expect(result).toEqual(mockStrategy);
      });
    });
  });
  describe('updateStrategy', () => {
    describe('正常系', () => {
      it('ユーザーに紐付く投資戦略メモを更新し、更新後の内容を取得する', async () => {
        // サービスのモック化
        const mockStrategy: Readonly<Strategy> = {
          id: 1,
          user: USER,
          text: 'テスト',
          addDate: '20220827',
          updDate: '20220827',
        };
        strategyService.updateStrategy.mockResolvedValue(mockStrategy);

        // リクエストパラメータ
        const updateStrategyInput: UpdateStrategyInput = {
          user: USER,
          text: 'テスト',
        };
        // テスト実行
        const result = await strategyResolver.updateStrategy(
          updateStrategyInput,
        );
        expect(result).toEqual(mockStrategy);
      });
    });
  });
});
