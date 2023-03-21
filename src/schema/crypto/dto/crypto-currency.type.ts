import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CryptoCurrency {
  @Field({ description: 'ティッカーシンボル' })
  name: string;

  @Field({ description: '現在価格' })
  price: number;
}
