import { PrismaService } from '@/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AssetRepository } from './asset.repository';
import { format } from 'date-fns';
import { migrateResetTest } from '@/prisma/prisma.util';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetCreateInput } from '@/@generated/prisma-nestjs-graphql/asset/asset-create.input';
import { Asset } from '@/@generated/prisma-nestjs-graphql/asset/asset.model';

describe('AssetRepository', () => {
  let assetRepository: AssetRepository;
  let prismaService: PrismaService;

  // ユーザー
  const USER_ID = 9;
  // 取得日数
  const DAY = 7;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.example'],
        }),
      ],
      providers: [AssetRepository, PrismaService],
    }).compile();

    assetRepository = module.get<AssetRepository>(AssetRepository);
    prismaService = module.get<PrismaService>(PrismaService);
    // DBリセット
    await migrateResetTest();
    // DB登録
    const assets: AssetCreateInput[] = [
      {
        total: 200000,
        asset: 173743.9,
        year: '2023',
        month: '02',
        date: '22',
        addDate: '20230222233928',
        updDate: '20230222234031',
        userId: USER_ID,
        cashUSD: 100,
        cashJPY: 10000,
        cashBTC: 0.1,
        cashETH: 0.1,
        cashRIPPLE: 1,
        cashBAT: 1,
        cashLTC: 1,
      },
      {
        total: 210000,
        asset: 292471.3,
        year: '2023',
        month: '02',
        date: '23',
        addDate: '20230223003003',
        updDate: '20230223003025',
        userId: USER_ID,
        cashUSD: 100,
        cashJPY: 10000,
        cashBTC: 0.1,
        cashETH: 0.1,
        cashRIPPLE: 1,
        cashBAT: 1,
        cashLTC: 1,
      },
    ];
    await prismaService.asset.createMany({ data: assets });
  });
  describe('fetchAssetList', () => {
    describe('正常系', () => {
      it('ユーザーに紐付く保有株式情報を取得する', async () => {
        // 期待値
        const expected: Asset[] = [
          {
            id: 2,
            total: 210000,
            asset: 292471.3,
            year: '2023',
            month: '02',
            date: '23',
            addDate: '20230223003003',
            updDate: '20230223003025',
            userId: USER_ID,
            cashUSD: 100,
            cashJPY: 10000,
            cashBTC: 0.1,
            cashETH: 0.1,
            cashRIPPLE: 1,
            cashBAT: 1,
            cashLTC: 1,
          },
          {
            id: 1,
            total: 200000,
            asset: 173743.9,
            year: '2023',
            month: '02',
            date: '22',
            addDate: '20230222233928',
            updDate: '20230222234031',
            userId: USER_ID,
            cashUSD: 100,
            cashJPY: 10000,
            cashBTC: 0.1,
            cashETH: 0.1,
            cashRIPPLE: 1,
            cashBAT: 1,
            cashLTC: 1,
          },
        ];
        // テスト実行
        const result = await assetRepository.fetchAssetList(USER_ID, DAY);
        expect(result).toEqual(expected);
      });
    });
  });
  describe('fetchTodayAsset', () => {
    describe('正常系', () => {
      it('ユーザーに紐付く当日の保有株式情報を取得する', async () => {
        // 当日データ追加
        // 現在日時取得
        const year = format(new Date(), 'yyyy');
        const month = format(new Date(), 'MM');
        const date = format(new Date(), 'dd');
        // 作成・更新日時取得
        const nowDate = format(new Date(), 'yyyyMMddHHmmss');
        const asset: AssetCreateInput = {
          total: 210000,
          asset: 173743.9,
          year,
          month,
          date,
          addDate: nowDate,
          updDate: nowDate,
          userId: USER_ID,
          cashUSD: 100,
          cashJPY: 10000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
        };
        await prismaService.asset.create({ data: asset });
        // 期待値
        const expected: Asset = {
          id: 3,
          total: 210000,
          asset: 173743.9,
          year,
          month,
          date,
          addDate: nowDate,
          updDate: nowDate,
          userId: USER_ID,
          cashUSD: 100,
          cashJPY: 10000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
        };
        // テスト実行
        const result = await assetRepository.fetchTodayAsset(USER_ID);
        expect(result).toEqual(expected);
        // 登録したデータを削除する
        await prismaService.asset.delete({
          where: {
            id: 3,
          },
        });
      });
    });
  });

  describe('createAsset', () => {
    describe('正常系', () => {
      it('保有株式情報を追加し、追加した情報を取得する', async () => {
        // 当日データ追加
        // 現在日時取得
        const year = format(new Date(), 'yyyy');
        const month = format(new Date(), 'MM');
        const date = format(new Date(), 'dd');
        // 作成・更新日時取得
        const nowDate = format(new Date(), 'yyyyMMddHHmmss');
        // 期待値
        const expected: Asset = {
          id: 3,
          total: 210000,
          asset: 173743.9,
          year,
          month,
          date,
          addDate: nowDate,
          updDate: nowDate,
          userId: USER_ID,
          cashUSD: 100,
          cashJPY: 10000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
        };
        // リクエストパラメータ
        const assetCreateInput: AssetCreateInput = {
          total: 210000,
          asset: 173743.9,
          year,
          month,
          date,
          addDate: nowDate,
          updDate: nowDate,
          userId: USER_ID,
          cashUSD: 100,
          cashJPY: 10000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
        };
        // テスト実行
        const result = await assetRepository.createAsset(assetCreateInput);
        expect(result).toEqual(expected);
        // 登録したデータを削除する
        await prismaService.asset.delete({
          where: {
            id: 3,
          },
        });
      });
    });
  });
  describe('updateAsset', () => {
    describe('正常系', () => {
      it('保有株式情報を更新し、更新した情報を取得する(資産総額更新)', async () => {
        // 更新日時取得
        const updDate = format(new Date(), 'yyyyMMddHHmmss');
        // 期待値
        const expected: Asset = {
          id: 1,
          total: 220000,
          asset: 193743.9,
          year: '2023',
          month: '02',
          date: '22',
          addDate: '20230222233928',
          updDate: updDate,
          userId: USER_ID,
          cashUSD: 100,
          cashJPY: 10000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
        };
        // リクエストパラメータ
        const updateAssetDto: UpdateAssetDto = {
          id: 1,
          total: 220000,
          asset: 193743.9,
          cashUSD: 100,
          cashJPY: 10000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
        };
        // テスト実行
        const result = await assetRepository.updateAsset(updateAssetDto);
        expect(result).toEqual(expected);
      });
      it('保有株式情報を更新し、更新した情報を取得する(現金更新)', async () => {
        // 更新日時取得
        const updDate = format(new Date(), 'yyyyMMddHHmmss');
        // 期待値
        const expected: Asset = {
          id: 1,
          total: 220000,
          asset: 200000,
          year: '2023',
          month: '02',
          date: '22',
          addDate: '20230222233928',
          updDate,
          userId: USER_ID,
          cashUSD: 500,
          cashJPY: 5000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
        };
        // リクエストパラメータ
        const updateAssetDto: UpdateAssetDto = {
          id: 1,
          total: 220000,
          asset: 200000,
          cashUSD: 500,
          cashJPY: 5000,
          cashBTC: 0.1,
          cashETH: 0.1,
          cashRIPPLE: 1,
          cashBAT: 1,
          cashLTC: 1,
        };
        // テスト実行
        const result = await assetRepository.updateAsset(updateAssetDto);
        expect(result).toEqual(expected);
      });
    });
  });
});
