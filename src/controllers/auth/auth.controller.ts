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
  // redirect(@Request() req, @Res() res: Response) {
  redirect(@Request() req) {
    // const { accessToken, refreshToken, email } = await this.authService.login(
    //   req?.user,
    // );
    return this.authService.login(req?.user);
    // // Set cookies
    // res.cookie('accessToken', accessToken, { httpOnly: true });
    // res.cookie('refreshToken', refreshToken, { httpOnly: true });
    // res.cookie('email', email);
    // // res.end();
    // const redirectUrl = this.configService.get<string>('REDIRECT_URL');
    // res.redirect(redirectUrl);
    // res.redirect('https://my-us-stock-portfolio-wqqgxxymjq-an.a.run.app');
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
