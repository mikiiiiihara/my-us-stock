// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenGuard } from '@/auth/guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  async googleAuth(@Req() _req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async redirect(@Request() req, @Res() res: Response) {
    const result = await this.authService.login(req?.user);

    // NestJSからNext.jsへリダイレクトするためのURLを設定
    const nextRedirectUrl = this.configService.get<string>('REDIRECT_URL');

    // NestJSからNext.jsへリダイレクトする前に、アクセストークンとリフレッシュトークンをCookieに保存
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    // NestJSからNext.jsへリダイレクト
    res.redirect(nextRedirectUrl);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshTokens(@Request() req) {
    const userId = req?.user.sub;
    const username = req.user.username;
    const refreshToken = req.user.refreshToken;

    return this.authService.refreshTokens(userId, username, refreshToken);
  }
}
