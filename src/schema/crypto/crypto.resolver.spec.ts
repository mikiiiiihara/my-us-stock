import { CRYPTO_TICKER } from '@/repositories/crypto/constants';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CryptoResolver } from './crypto.resolver';
import { CryptoService } from './crypto.service';

const mockCryptoService = () => ({
  getCryptoPriceList: jest.fn(),
});
describe('CryptoResolver', () => {
  let cryptoResolver: CryptoResolver;
  let cryptoService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.example'],
        }),
      ],
      providers: [
        CryptoResolver,
        {
          provide: CryptoService,
          useFactory: mockCryptoService,
        },
      ],
    }).compile();

    cryptoResolver = module.get<CryptoResolver>(CryptoResolver);
    // モック
    cryptoService = module.get<CryptoService>(CryptoService);
  });
  describe('getCryptoPriceList', () => {
    describe('正常系', () => {
      it('指定した仮想通貨配列の価格リストを取得する', async () => {
        // サービスのモック化
        const mockCryptoList = [
          {
            name: 'btc',
            price: 3673810,
          },
          {
            name: 'eth',
            price: 230577,
          },
        ];
        cryptoService.getCryptoPriceList.mockResolvedValue(mockCryptoList);
        // リクエストパラメータ
        const cryptoList = [CRYPTO_TICKER.BTC, CRYPTO_TICKER.ETH];
        // テスト実行
        const result = await cryptoResolver.getCryptoPriceList(cryptoList);
        expect(result).toEqual(mockCryptoList);
      });
    });
  });
});
