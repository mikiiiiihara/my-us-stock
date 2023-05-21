import { Controller, Get, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  async googleAuth(@Req() _req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async redirect(@Request() req, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(
      req?.user,
    );
    // Set cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      // sameSite: process.env.NODE_ENV !== 'dev' ? 'none' : undefined,
      // secure: process.env.NODE_ENV !== 'dev',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      // sameSite: process.env.NODE_ENV !== 'dev' ? 'none' : undefined,
      // secure: process.env.NODE_ENV !== 'dev',
    });
    const baseUrl = this.configService.get<string>('REDIRECT_URL');
    res.redirect(`${baseUrl}/home`);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshTokens(
    @Request() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = req?.user.sub;
    const username = req.user.username;
    const refreshToken = req.user.refreshToken;
    const { accessToken } = await this.authService.refreshTokens(
      userId,
      username,
      refreshToken,
    );
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      // sameSite: process.env.NODE_ENV !== 'dev' ? 'none' : undefined,
      // secure: process.env.NODE_ENV !== 'dev',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      // sameSite: process.env.NODE_ENV !== 'dev' ? 'none' : undefined,
      // secure: process.env.NODE_ENV !== 'dev',
    });
    return { accessToken };
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    // Clear the cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return { message: 'Logged out successfully' };
  }
}
