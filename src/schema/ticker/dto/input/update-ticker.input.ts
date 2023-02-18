import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, Min } from 'class-validator';

@InputType()
export class UpdateTickerInput {
  @Field(() => Int)
  id: number;

  @Field({ description: '取得価格' })
  @IsOptional()
  @Min(0)
  getPrice?: number;

  @Field(() => Int, { description: '保有株数' })
  @IsOptional()
  @Min(0)
  quantity?: number;

  @Field({ description: '配当' })
  @IsOptional()
  @Min(0)
  dividend?: number;

  @Field({ description: '購入時為替' })
  @IsOptional()
  @Min(0)
  usdjpy?: number;

  @Field({ description: '現在価格' })
  currentPrice: number;

  @Field({ description: '変化額' })
  priceGets: number;

  @Field({ description: '変化率' })
  currentRate: number;
}
