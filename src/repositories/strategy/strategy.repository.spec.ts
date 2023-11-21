import { PrismaService } from '@/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { StrategyRepository } from './strategy.repository';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { UpdateStrategyDto } from './dto/update-strategy.dto';
import { Strategy } from '@/@generated/prisma-nestjs-graphql/strategy/strategy.model';

describe('StrategyRepository', () => {
  let strategyRepository: StrategyRepository;
  let prismaService: PrismaService;

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
      providers: [StrategyRepository, PrismaService],
    }).compile();

    strategyRepository = module.get<StrategyRepository>(StrategyRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });
  describe('fetchStrategy', () => {
    describe('正常系', () => {
      it('ユーザーに紐付く投資戦略メモを取得する', async () => {
        // モック関数
        const mockPrismaService = {
          strategy: {
            findFirst: jest.fn().mockResolvedValue({
              id: 1,
              userId: USER_ID,
              text: 'テスト',
              addDate: '20220827',
              updDate: '20220827',
            }),
          },
        };
        // モックを使用するようにStrategyRepositoryを再初期化
        strategyRepository = new StrategyRepository(mockPrismaService as any);
        // 期待値
        const expected: Strategy = {
          id: 1,
          userId: USER_ID,
          text: 'テスト',
          addDate: '20220827',
          updDate: '20220827',
        };
        // テスト実行
        const result = await strategyRepository.fetchStrategy(USER_ID);
        expect(result).toEqual(expected);
      });
    });
  });
  describe('createStrategy', () => {
    it('ユーザーに紐付く投資戦略メモを登録し、登録した内容を取得する', async () => {
      // モック関数
      const mockPrismaService = {
        strategy: {
          create: jest.fn().mockResolvedValue({
            id: 2,
            userId: USER_ID,
            text: 'テスト2',
            addDate: '20220827',
            updDate: '20220827',
          }),
        },
      };

      // モックを使用するようにStrategyRepositoryを再初期化
      strategyRepository = new StrategyRepository(mockPrismaService as any);

      const createStrategyDto: CreateStrategyDto = {
        userId: USER_ID,
        text: 'テスト2',
      };

      // テスト実行
      const result = await strategyRepository.createStrategy(createStrategyDto);
      expect(result).toEqual({
        id: 2,
        userId: USER_ID,
        text: 'テスト2',
        addDate: '20220827',
        updDate: '20220827',
      });
    });
  });

  describe('updateStrategy', () => {
    it('ユーザーに紐付く投資戦略メモを更新し、更新後の内容を取得する', async () => {
      // モック関数
      const mockPrismaService = {
        strategy: {
          update: jest.fn().mockResolvedValue({
            id: 1,
            userId: USER_ID,
            text: 'テスト2',
            addDate: '20220827',
            updDate: '20220828', // 更新日時を変更
          }),
        },
      };

      // モックを使用するようにStrategyRepositoryを再初期化
      strategyRepository = new StrategyRepository(mockPrismaService as any);

      const updateStrategyDto: UpdateStrategyDto = {
        id: 1,
        text: 'テスト2',
      };

      // テスト実行
      const result = await strategyRepository.updateStrategy(updateStrategyDto);
      expect(result).toEqual({
        id: 1,
        userId: USER_ID,
        text: 'テスト2',
        addDate: '20220827',
        updDate: '20220828',
      });
    });
  });
});
