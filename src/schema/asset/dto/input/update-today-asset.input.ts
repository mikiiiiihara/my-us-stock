import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class UpdateTodayAssetInput {
  @Field(() => Int, { description: 'id' })
  @Min(0)
  id: number;

  @Field({ description: '現金(ドル)' })
  @Min(0)
  cashUSD: number;

  @Field(() => Int, { description: '現金(円)' })
  @Min(0)
  cashJPY: number;

  @Field({ description: 'BTC' })
  @Min(0)
  cashBTC: number;

  @Field({ description: 'ETH' })
  @Min(0)
  cashETH: number;

  @Field({ description: 'RIPPLE' })
  @Min(0)
  cashRIPPLE: number;

  @Field({ description: 'BAT' })
  @Min(0)
  cashBAT: number;

  @Field({ description: 'LTC' })
  @Min(0)
  cashLTC: number;
}
