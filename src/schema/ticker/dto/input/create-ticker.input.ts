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

  @Field({ description: 'セクター' })
  @IsNotEmpty()
  @IsString()
  sector: string;

  @Field({ description: '購入時為替' })
  @Min(0)
  usdjpy: number;

  @Field({ description: '現在価格' })
  currentPrice: number;

  @Field({ description: '変化額' })
  priceGets: number;

  @Field({ description: '変化率' })
  currentRate: number;
}
