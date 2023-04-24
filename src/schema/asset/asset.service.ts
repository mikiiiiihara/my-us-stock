import { Injectable } from '@nestjs/common';
import { AssetRepository } from '@/repositories/asset/asset.repository';
import { CreateAssetDto } from 'src/repositories/asset/dto/create-asset.dto';
import { UpdateAssetDto } from 'src/repositories/asset/dto/update-asset.dto';
import { UpdateCashInput } from './dto/input/update-cash.input';
import { UpdateTodayAssetInput } from './dto/input/update-today-asset.input';
import { GetTotalService } from '@/common/get-total/get-total.service';
import { Asset } from '@/common/types/asset/asset.model';
import { TickerRepository } from '@/repositories/ticker/ticker.repository';

@Injectable()
export class AssetService {
  constructor(
    private readonly assetRepository: AssetRepository,
    private readonly tickerRepository: TickerRepository,
    private readonly getTotalService: GetTotalService,
  ) {}

  async fetchAssetList(user: string, day: number): Promise<Asset[]> {
    // 画面では昇順で扱いたいため直す
    const assetList = await this.assetRepository.fetchAssetList(user, day);
    return assetList.sort(function (a, b) {
      if (a.addDate < b.addDate) return -1;
      if (a.addDate > b.addDate) return 1;
      return 0;
    });
  }

  // 当日の資産総額を更新する(画面側で当日データのidを指定する)
  async createTodayAsset(user: string): Promise<Asset> {
    // 過去の中の最新データを取得
    const existAssets: Asset[] = await this.assetRepository.fetchAssetList(
      user,
    );
    // 日付比較用
    let latestAsset: Asset;
    let keepDate: Date;
    for (const value of existAssets) {
      const yyyyMMddStr = value.year + '/' + value.month + '/' + value.date;
      const yyyyMMdd = new Date(yyyyMMddStr);
      // latestAsset = 空の場合、現在のvalueを代入・keepDateに代入
      if (latestAsset == null) {
        latestAsset = value;
        keepDate = yyyyMMdd;
      } else {
        // latestAssetが空でなくて、現在のvalueのyyyyMMddがkeepDateより最新の場合
        if (keepDate != null && yyyyMMdd.getTime() > keepDate.getTime()) {
          latestAsset = value;
          keepDate = yyyyMMdd;
        }
      }
    }
    // ユーザーに紐付く保有株式情報を取得
    const asset = await this.fetchCurrentAsset(user);
    // 直近の資産データの現金額を登録
    const cashUSD = latestAsset == null ? 0 : latestAsset.cashUSD;
    const cashJPY = latestAsset == null ? 0 : latestAsset.cashJPY;
    const cashBTC = latestAsset == null ? 0 : latestAsset.cashBTC;
    const cashETH = latestAsset == null ? 0 : latestAsset.cashETH;
    const cashRIPPLE = latestAsset == null ? 0 : latestAsset.cashRIPPLE;
    const cashBAT = latestAsset == null ? 0 : latestAsset.cashBAT;
    const cashLTC = latestAsset == null ? 0 : latestAsset.cashLTC;
    // 合計金額
    const total = await this.getTotalService.getTotal(
      asset,
      cashUSD,
      cashJPY,
      cashBTC,
      cashETH,
      cashRIPPLE,
      cashBAT,
      cashLTC,
    );
    // create
    const createAssetDto: CreateAssetDto = {
      asset,
      total,
      user,
      cashUSD,
      cashJPY,
      cashBTC,
      cashETH,
      cashRIPPLE,
      cashBAT,
      cashLTC,
    };
    return await this.assetRepository.createAsset(createAssetDto);
  }

  // 当日の資産総額を更新する(画面側で当日データのidを指定する)
  async updateTodayAsset(
    updateTodayAssetInput: UpdateTodayAssetInput,
  ): Promise<Asset> {
    const {
      user,
      cashUSD,
      cashJPY,
      cashBTC,
      cashETH,
      cashRIPPLE,
      cashBAT,
      cashLTC,
    } = updateTodayAssetInput;
    // ユーザーに紐付く保有株式情報を取得
    const asset = await this.fetchCurrentAsset(user);
    const total = await this.getTotalService.getTotal(
      asset,
      cashUSD,
      cashJPY,
      cashBTC,
      cashETH,
      cashRIPPLE,
      cashBAT,
      cashLTC,
    );
    // update
    const updateAssetDto: UpdateAssetDto = {
      ...updateTodayAssetInput,
      asset,
      total,
    };
    return await this.assetRepository.updateAsset(updateAssetDto);
  }

  async updateCash(updateCashInput: UpdateCashInput): Promise<Asset> {
    const {
      user,
      cashUSD,
      cashJPY,
      cashBTC,
      cashETH,
      cashRIPPLE,
      cashBAT,
      cashLTC,
    } = updateCashInput;

    //本日分のデータが既に存在するか？
    const existAsset = await this.assetRepository.fetchTodayAsset(user);
    // ユーザーに紐付く保有株式情報を取得
    const asset = await this.fetchCurrentAsset(user);
    // 更新後の資産総額を計算
    const total = await this.getTotalService.getTotal(
      asset,
      cashUSD,
      cashJPY,
      cashBTC,
      cashETH,
      cashRIPPLE,
      cashBAT,
      cashLTC,
    );
    // 処理実行
    if (existAsset == null) {
      // create
      const createAssetDto: CreateAssetDto = {
        ...updateCashInput,
        asset,
        total: total,
      };
      return await this.assetRepository.createAsset(createAssetDto);
    } else {
      // update
    }
    // update
    const updateAssetDto: UpdateAssetDto = {
      ...updateCashInput,
      id: existAsset.id,
      asset,
      total: total,
    };
    return await this.assetRepository.updateAsset(updateAssetDto);
  }
  private async fetchCurrentAsset(user: string): Promise<number> {
    const tickers = await this.tickerRepository.fetchTickerList(user);
    return await this.getTotalService.getCurrentTickerPriceSum(tickers);
  }
}
