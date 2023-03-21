import { AxiosService } from '@/axios/axios.service';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CRYPTO_TICKER } from './constants';
import { CryptoRepository } from './crypto.repository';
import { Crypto } from './dto/crypto.entity';

const mockAxiosService = () => ({
  get: jest.fn(),
});

describe('CryptoRepository', () => {
  let cryptoRepository: CryptoRepository;
  let axiosService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.example'],
        }),
      ],
      providers: [
        CryptoRepository,
        {
          provide: AxiosService,
          useFactory: mockAxiosService,
        },
      ],
    }).compile();

    cryptoRepository = module.get<CryptoRepository>(CryptoRepository);
    axiosService = module.get<AxiosService>(AxiosService);
  });
  describe('fetchCryptoPrice', () => {
    describe('正常系', () => {
      it('指定した仮想通貨の価格を取得する', async () => {
        // モック化
        axiosService.get.mockResolvedValue({
          success: 1,
          data: {
            sell: '50.750',
            buy: '50.749',
            open: '50.706',
            high: '50.917',
            low: '49.333',
            last: '50.749',
            vol: '13346627.3932',
            timestamp: 1679376127932,
          },
        });
        // 期待値
        const ticker = CRYPTO_TICKER.RIPPLE;
        const expected: Crypto = {
          name: ticker,
          price: 50.749,
        };
        // テスト実行
        const result = await cryptoRepository.fetchCryptoPrice(ticker);
        expect(result).toEqual(expected);
      });
    });
  });
});
