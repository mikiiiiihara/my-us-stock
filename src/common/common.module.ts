import { Module } from '@nestjs/common';
import { GetTotalModule } from './get-total/get-total.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GetTotalModule, UsersModule, AuthModule],
})
export class CommonModule {}
