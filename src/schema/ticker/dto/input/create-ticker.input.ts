import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

@InputType()
export class CreateTickerInput {
  @Field({
    description: 'ティッカーシンボル',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  ticker: string;

  @Field({ description: '取得価格' })
  @Min(0)
  getPrice: number;

  @Field(() => Int, { description: '保有株数' })
  @Min(0)
  quantity: number;

  @Field({ description: 'ユーザー名' })
  @IsNotEmpty()
  @IsString()
  user: string;

  @Field({ description: '配当' })
  @Min(0)
  dividend: number;

  @Field(() => Int, { description: '配当付与回数' })
  @Min(0)
  dividendTime: number;

  @Field(() => Int, { description: '初回配当付与月' })
  @Min(0)
  dividendFirstTime: number;

  @Field({ description: 'セクター' })
  @IsNotEmpty()
  @IsString()
  sector: string;

  @Field({ description: '購入時為替' })
  @Min(0)
  usdjpy: number;
}
