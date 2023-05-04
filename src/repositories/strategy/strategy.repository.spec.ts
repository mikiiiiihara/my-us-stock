import { PrismaService } from '@/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { migrateResetTest } from '@/prisma/prisma.util';
import { StrategyRepository } from './strategy.repository';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { format } from 'date-fns';
import { UpdateStrategyDto } from './dto/update-strategy.dto';
import { Strategy } from '@/@generated/prisma-nestjs-graphql/strategy/strategy.model';

describe('AssetRepository', () => {
  let strategyRepository: StrategyRepository;
  let prismaService: PrismaService;

  // ユーザー
  const USER_ID = 9;

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
    // DBリセット
    await migrateResetTest();
    // DB登録
    const strategy = {
      userId: USER_ID,
      text: 'テスト',
      addDate: '20220827',
      updDate: '20220827',
    };
    await prismaService.strategy.create({ data: strategy });
  });
  describe('fetchStrategy', () => {
    describe('正常系', () => {
      it('ユーザーに紐付く投資戦略メモを取得する', async () => {
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
    describe('正常系', () => {
      it('ユーザーに紐付く投資戦略メモを登録し、登録した内容を取得する', async () => {
        // 作成・更新日時取得
        const nowDate = format(new Date(), 'yyyyMMdd');
        // 期待値
        const expected: Strategy = {
          id: 2,
          userId: USER_ID,
          text: 'テスト2',
          addDate: nowDate,
          updDate: nowDate,
        };
        // リクエストパラメータ
        const createStrategyDto: CreateStrategyDto = {
          userId: USER_ID,
          text: 'テスト2',
        };
        // テスト実行
        const result = await strategyRepository.createStrategy(
          createStrategyDto,
        );
        expect(result).toEqual(expected);
        // 登録したデータを削除する
        await prismaService.strategy.delete({
          where: {
            id: 2,
          },
        });
      });
    });
  });
  describe('updateStrategy', () => {
    describe('正常系', () => {
      it('ユーザーに紐付く投資戦略メモを更新し、更新後の内容を取得する', async () => {
        // 作成・更新日時取得
        const nowDate = format(new Date(), 'yyyyMMdd');
        // 期待値
        const expected: Strategy = {
          id: 1,
          userId: USER_ID,
          text: 'テスト2',
          addDate: '20220827',
          updDate: nowDate,
        };
        // リクエストパラメータ
        const updateStrategyDto: UpdateStrategyDto = {
          id: 1,
          text: 'テスト2',
        };
        // テスト実行
        const result = await strategyRepository.updateStrategy(
          updateStrategyDto,
        );
        expect(result).toEqual(expected);
      });
    });
  });
});
