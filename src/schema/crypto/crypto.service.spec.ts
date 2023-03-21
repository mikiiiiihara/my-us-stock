import { CryptoRepository } from '@/repositories/crypto/crypto.repository';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';
import { Crypto } from '@/repositories/crypto/dto/crypto.entity';
import { CRYPTO_TICKER } from '@/repositories/crypto/constants';

const mockCryptoRepository = () => ({
  fetchCryptoPrice: jest.fn(),
});
describe('CryptoService', () => {
  let cryptoService: CryptoService;
  let cryptoRepository: any;

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
          provide: CryptoRepository,
          useFactory: mockCryptoRepository,
        },
        CryptoService,
      ],
    }).compile();

    cryptoService = module.get<CryptoService>(CryptoService);
    // モック
    cryptoRepository = module.get<CryptoRepository>(CryptoRepository);
  });
  describe('getCryptoPriceList', () => {
    describe('正常系', () => {
      it('指定した仮想通貨配列の価格リストを取得する', async () => {
        // repositoryのモック化
        const mockCryptoBTC: Readonly<Crypto> = {
          name: 'btc',
          price: 3673810,
        };
        cryptoRepository.fetchCryptoPrice.mockResolvedValueOnce(mockCryptoBTC);
        const mockCryptoETH: Readonly<Crypto> = {
          name: 'eth',
          price: 230577,
        };
        cryptoRepository.fetchCryptoPrice.mockResolvedValueOnce(mockCryptoETH);
        // リクエストパラメータ
        const cryptoList = [CRYPTO_TICKER.BTC, CRYPTO_TICKER.ETH];
        const expected: Readonly<Crypto[]> = [
          {
            name: 'btc',
            price: 3673810,
          },
          {
            name: 'eth',
            price: 230577,
          },
        ];
        // テスト実行
        const result = await cryptoService.getCryptoPriceList(cryptoList);
        expect(result).toEqual(expected);
      });
    });
  });
});
