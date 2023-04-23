import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MyLogger } from 'src/logger/logger.service';
import { User } from './types/user.type';
import { TokenAndEmail } from './types/token-and-email';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private logger: MyLogger,
  ) {}

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('jwt.accessSecret'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('jwt.refreshSecret'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async refreshTokens(userId: string, username: string, refreshToken: string) {
    // ちゃんとやりたい場合は、データベースに保存しておいたハッシュ化された refreshToken と
    // ユーザーから渡された refreshToken をハッシュ化して比較して、一致しない場合は例外を投げる。
    // ここはサンプルなので、 refreshTokens が呼ばれたら新しい accessToken を返す。
    const tokens = await this.getTokens(userId, username);
    return tokens;
  }

  async login(user: User | undefined): Promise<TokenAndEmail> {
    this.logger.log(`starting google login...`);
    if (user === undefined) {
      this.logger.error(`failed google login`);
      throw new InternalServerErrorException(
        `Googleからユーザー情報が渡されていません ${user}`,
      );
    }
    this.logger.log(`google login succeeded!!`);
    this.logger.log(`email: ${user.email}`);

    const { accessToken, refreshToken } = await this.getTokens(
      user.id,
      user.email,
    );

    return {
      email: user.email,
      accessToken,
      refreshToken,
    };
  }
}
