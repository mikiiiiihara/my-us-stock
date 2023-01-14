import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Strategy {
  @Field(() => ID)
  id: number;

  @Field({ description: 'ユーザー名' })
  user: string;

  @Field({ description: '文章' })
  text: string;

  @Field({ description: '作成日時' })
  addDate: string;

  @Field({ description: '更新日時' })
  updDate: string;
}
