import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class TickerAvgAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    getPrice?: true;

    @Field(() => Boolean, {nullable:true})
    quantity?: true;

    @Field(() => Boolean, {nullable:true})
    dividend?: true;

    @Field(() => Boolean, {nullable:true})
    dividendTime?: true;

    @Field(() => Boolean, {nullable:true})
    dividendFirstTime?: true;

    @Field(() => Boolean, {nullable:true})
    usdjpy?: true;
}
