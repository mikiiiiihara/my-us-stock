import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class TickerAvgAggregate {

    @Field(() => Float, {nullable:true})
    id?: number;

    @Field(() => Float, {nullable:true})
    getPrice?: number;

    @Field(() => Float, {nullable:true})
    quantity?: number;

    @Field(() => Float, {nullable:true})
    dividend?: number;

    @Field(() => Float, {nullable:true})
    dividendTime?: number;

    @Field(() => Float, {nullable:true})
    dividendFirstTime?: number;

    @Field(() => Float, {nullable:true})
    usdjpy?: number;

    @Field(() => Float, {nullable:true})
    userId?: number;
}
