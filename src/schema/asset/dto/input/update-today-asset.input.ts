import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class UpdateTodayAssetInput {
  @Field(() => Int, { description: 'id' })
  @Min(0)
  id: number;

  @Field({ description: '株式総額' })
  @Min(0)
  asset: number;
}
