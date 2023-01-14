import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateStrategyInput {
  @Field({ description: 'ユーザー名' })
  @IsNotEmpty()
  @IsString()
  user: string;

  @Field({ description: '文章' })
  @IsNotEmpty()
  @IsString()
  text: string;
}
