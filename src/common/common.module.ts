import { Module } from '@nestjs/common';
import { GetTotalModule } from './get-total/get-total.module';

@Module({
  imports: [GetTotalModule],
})
export class CommonModule {}
