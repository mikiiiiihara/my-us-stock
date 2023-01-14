import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Asset {
  @Field(() => ID)
  id: number;
  @Field({ description: '株式総額' })
  asset: number;
  @Field({ description: '対象年' })
  year: string;
  @Field({ description: '対象月' })
  month: string;
  @Field({ description: '対象日' })
  date: string;
  @Field({ description: '作成日時' })
  addDate: string;
  @Field({ description: '更新日時' })
  updDate: string;
  @Field({ description: 'ユーザー名' })
  user: string;
  @Field({ description: '現金(ドル)' })
  cashUSD: number;
  @Field(() => Int, { description: '現金(円)' })
  cashJPY: number;
}
