import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class TickerSumAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Float, {nullable:true})
    getPrice?: number;

    @Field(() => Int, {nullable:true})
    quantity?: number;

    @Field(() => Float, {nullable:true})
    usdjpy?: number;
}
