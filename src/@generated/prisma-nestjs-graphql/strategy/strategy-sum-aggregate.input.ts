import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class StrategySumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;
}
