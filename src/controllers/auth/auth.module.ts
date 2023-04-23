import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleStrategy } from '@/auth/strategies/google.strategy';
import { RefreshTokenStrategy } from '@/auth/strategies/refresh-token.strategy';
import { AccessTokenStrategy } from '@/auth/strategies/access-token.strategy';
import { LoggerModule } from '@/logger/logger.module';

@Module({
  imports: [
    // registerAsync の中で ConfigService を inject するやり方は以下の記事を参照する。
    // https://stackoverflow.com/questions/53426486/best-practice-to-use-config-service-in-nestjs-module
    // https://stackoverflow.com/questions/64337784/nestjs-use-configservice-in-simple-provider-class
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.accessSecret'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    LoggerModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
