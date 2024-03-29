import { StrategyRepository } from '@/repositories/strategy/strategy.repository';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { StrategyService } from './strategy.service';
import { Strategy } from '@/@generated/prisma-nestjs-graphql/strategy/strategy.model';
import { UpdateStrategyDto } from './dto/update-strategy.dto';

const mockStrategyRepository = () => ({
  fetchStrategy: jest.fn(),
  createStrategy: jest.fn(),
  updateStrategy: jest.fn(),
});
describe('StrategyService', () => {
  let strategyService: StrategyService;
  let tickerRepository: any;

  // ユーザー
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
        {
          provide: StrategyRepository,
          useFactory: mockStrategyRepository,
        },
        StrategyService,
      ],
    }).compile();

    strategyService = module.get<StrategyService>(StrategyService);
    // モック
    tickerRepository = module.get<StrategyRepository>(StrategyRepository);
  });
  describe('fetchStrategy', () => {
    describe('正常系', () => {
      it('ユーザーに紐付く投資戦略メモを取得する', async () => {
        // repositoryのモック化
        const mockStrategy: Readonly<Strategy> = {
          id: 1,
          userId: USER_ID,
          text: 'テスト',
          addDate: '20220827',
          updDate: '20220827',
        };
        tickerRepository.fetchStrategy.mockResolvedValue(mockStrategy);
        // テスト実行
        const result = await strategyService.fetchStrategy(USER_ID);
        expect(result).toEqual(mockStrategy);
      });
    });
  });
  describe('updateStrategy', () => {
    describe('正常系', () => {
      it('既存データがある場合、ユーザーに紐付く投資戦略メモを更新し、更新後の内容を取得する', async () => {
        // repositoryのモック化
        const mockStrategy: Readonly<Strategy> = {
          id: 1,
          userId: USER_ID,
          text: 'テスト',
          addDate: '20220827',
          updDate: '20220827',
        };
        tickerRepository.fetchStrategy.mockResolvedValue(mockStrategy);
        tickerRepository.updateStrategy.mockResolvedValue(mockStrategy);
        // リクエストパラメータ
        const updateStrategyDto: UpdateStrategyDto = {
          userId: USER_ID,
          text: 'テスト',
        };
        // テスト実行
        const result = await strategyService.updateStrategy(updateStrategyDto);
        expect(result).toEqual(mockStrategy);
      });
      it('既存データがない場合、ユーザーに紐付く投資戦略メモを登録し、登録した内容を取得する', async () => {
        // repositoryのモック化
        const mockStrategy: Readonly<Strategy> = {
          id: 1,
          userId: USER_ID,
          text: 'テスト',
          addDate: '20220827',
          updDate: '20220827',
        };
        await tickerRepository.fetchStrategy.mockResolvedValue(null);
        tickerRepository.createStrategy.mockResolvedValue(mockStrategy);
        // リクエストパラメータ
        const updateStrategyDto: UpdateStrategyDto = {
          userId: USER_ID,
          text: 'テスト',
        };
        // テスト実行
        const result = await strategyService.updateStrategy(updateStrategyDto);
        expect(result).toEqual(mockStrategy);
      });
    });
  });
});
