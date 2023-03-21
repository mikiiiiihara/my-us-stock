import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class TickerMaxAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:true})
    ticker?: string;

    @Field(() => Float, {nullable:true})
    getPrice?: number;

    @Field(() => Int, {nullable:true})
    quantity?: number;

    @Field(() => String, {nullable:true})
    user?: string;

    @Field(() => Float, {nullable:true})
    dividend?: number;

    @Field(() => Int, {nullable:true})
    dividendTime?: number;

    @Field(() => Int, {nullable:true})
    dividendFirstTime?: number;

    @Field(() => String, {nullable:true})
    sector?: string;

    @Field(() => Float, {nullable:true})
    usdjpy?: number;
}
