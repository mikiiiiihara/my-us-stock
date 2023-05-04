import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class TickerCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    ticker!: number;

    @Field(() => Int, {nullable:false})
    getPrice!: number;

    @Field(() => Int, {nullable:false})
    quantity!: number;

    @Field(() => Int, {nullable:false})
    dividend!: number;

    @Field(() => Int, {nullable:false})
    dividendTime!: number;

    @Field(() => Int, {nullable:false})
    dividendFirstTime!: number;

    @Field(() => Int, {nullable:false})
    sector!: number;

    @Field(() => Int, {nullable:false})
    usdjpy!: number;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
