import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../dto/types/jwt-payload.type';
import { UsersService } from '@/common/users/users.service';
import { User } from '@/@generated/prisma-nestjs-graphql/user/user.model';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<User | null> {
    const user = this.usersService.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
