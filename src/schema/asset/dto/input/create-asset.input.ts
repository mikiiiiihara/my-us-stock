import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Min } from 'class-validator';

@InputType()
export class CreateAssetInput {
  @Field({ description: '株式総額' })
  @Min(0)
  asset: number;

  @Field({ description: 'ユーザー名' })
  @IsNotEmpty()
  @IsString()
  user: string;

  @Field({ description: '現金(ドル)' })
  @Min(0)
  cashUSD: number;

  @Field(() => Int, { description: '現金(円)' })
  @Min(0)
  cashJPY: number;
}
