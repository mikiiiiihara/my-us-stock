import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload.type';

export const CurrentUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const token = request.headers.authorization.split(' ')[1];
    const jwtService = new JwtService({ secret: process.env.JWT_SECRET }); // Replace with your JWT secret
    const decoded = jwtService.decode(token) as JwtPayload;
    return decoded.sub;
  },
);
