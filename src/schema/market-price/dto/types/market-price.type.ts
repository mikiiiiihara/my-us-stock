import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MarketPrice {
  @Field({ description: 'ティッカーシンボル' })
  ticker: string;

  @Field({ description: '現在価格' })
  currentPrice: number;

  @Field({ description: '変化額' })
  priceGets: number;

  @Field({ description: '変化率' })
  currentRate: number;
}
