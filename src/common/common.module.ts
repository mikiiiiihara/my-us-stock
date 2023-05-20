import { Module } from '@nestjs/common';
import { GetTotalModule } from './get-total/get-total.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GetTotalModule, AuthModule],
})
export class CommonModule {}
