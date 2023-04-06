import { GetTotalService } from '@/common/get-total/get-total.service';
import { Asset } from '@/common/types/asset/asset.model';
import { AssetRepository } from '@/repositories/asset/asset.repository';
import { CreateAssetDto } from '@/repositories/asset/dto/create-asset.dto';
import { CurrencyRepository } from '@/repositories/currency/currency.repository';
import { MarketPriceRepository } from '@/repositories/market-price/market-price.repository';
import { Ticker as TickerOfRepository } from '@/repositories/ticker/entity/tiker.entity';
import { TickerRepository } from '@/repositories/ticker/ticker.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssetService {
  constructor(
    private readonly assetRepository: AssetRepository,
    private readonly tickerRepository: TickerRepository,
    private readonly marketPriceRepository: MarketPriceRepository,
    private readonly currencyRepository: CurrencyRepository,
    private readonly getTotalService: GetTotalService,
  ) {}
  async createTodayAsset(user: string): Promise<string> {
    // 本日の資産が登録されていた場合、登録は行わず処理終了
    const existAsset = await this.assetRepository.fetchTodayAsset(user);
    if (existAsset != null) return 'Already created';
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
    // 直近の資産データの現金額を登録
    // TODO: 保有株式情報の最新情報を取得する処理を入れる
    // ユーザーに紐付く保有株式情報を取得
    const tickers = await this.tickerRepository.fetchTickerList(user);
    const currentTickerPriceSum = await this.getCurrentTickerPriceSum(tickers);
    const asset = currentTickerPriceSum;
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
    const createAssetDto: CreateAssetDto = {
      asset,
      user,
      cashUSD,
      cashJPY,
      total,
      cashBTC,
      cashETH,
      cashRIPPLE,
      cashBAT,
      cashLTC,
    };
    await this.assetRepository.createAsset(createAssetDto);
    return `【${new Date()}】Created Todays Asset of ${user}!`;
  }

  private async getCurrentTickerPriceSum(
    tickerList: TickerOfRepository[],
  ): Promise<number> {
    // 保有株がなければ、0を返す
    if (tickerList.length === 0) return 0;
    const tickerNameList = tickerList.map((ticker) => ticker.ticker);
    const marketPriceList =
      await this.marketPriceRepository.fetchMarketPriceList(tickerNameList);
    // 現在の保有株の総額リストを計算し返却する
    const currentTickerPriceListByUsd = tickerList.map((tickerItem) => {
      const marketPrice = marketPriceList.find(
        (marketPrice) => marketPrice.ticker == tickerItem.ticker,
      );
      // 現在価格 * 保有株数の値を返却する
      return marketPrice.currentPrice * tickerItem.quantity;
    });
    // 現在のドル円を取得する
    const currentUsdJpy = await this.currencyRepository.fetchCurrentUsdJpy();
    return (
      currentTickerPriceListByUsd.reduce((sum, element) => sum + element, 0) *
      currentUsdJpy
    );
  }
}
