import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Min } from 'class-validator';

@InputType()
export class CreateTodayAssetInput {
  @Field({ description: '株式総額' })
  @Min(0)
  asset: number;

  @Field({ description: 'ユーザー名' })
  @IsNotEmpty()
  @IsString()
  user: string;
}
