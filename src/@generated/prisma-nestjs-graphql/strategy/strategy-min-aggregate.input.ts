import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class StrategyMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    text?: true;

    @Field(() => Boolean, {nullable:true})
    addDate?: true;

    @Field(() => Boolean, {nullable:true})
    updDate?: true;

    @Field(() => Boolean, {nullable:true})
    userId?: true;
}
