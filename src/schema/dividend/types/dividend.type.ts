import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Dividend {
  @Field({ description: 'ティッカーシンボル' })
  ticker: string;

  @Field({ description: '１回当たり配当' })
  dividend: number;

  @Field({ description: '年間配当' })
  dividendTotal: number;

  @Field({ description: '保有株式数' })
  quantity: number;

  @Field({ description: '１年当たり配当付与回数' })
  dividendTime: number;

  @Field(() => [Int], { description: '配当付与月', nullable: true })
  dividendMonth: number[];
}
