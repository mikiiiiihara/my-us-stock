import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Ticker {
  @Field(() => ID)
  id: number;

  @Field({ description: 'ティッカーシンボル' })
  ticker: string;

  @Field({ description: '取得価格' })
  getPrice: number;

  @Field({ description: '１年当たり配当' })
  dividend: number;

  @Field(() => Int, { description: '保有株数' })
  quantity: number;

  @Field({ description: 'セクター' })
  sector: string;

  @Field({ description: '購入時為替' })
  usdjpy: number;

  @Field({ description: '現在価格' })
  currentPrice: number;

  @Field({ description: '変化額' })
  priceGets: number;

  @Field({ description: '変化率' })
  currentRate: number;
}
