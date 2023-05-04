import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { TickerCountAggregate } from './ticker-count-aggregate.output';
import { TickerAvgAggregate } from './ticker-avg-aggregate.output';
import { TickerSumAggregate } from './ticker-sum-aggregate.output';
import { TickerMinAggregate } from './ticker-min-aggregate.output';
import { TickerMaxAggregate } from './ticker-max-aggregate.output';

@ObjectType()
export class TickerGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    ticker!: string;

    @Field(() => Float, {nullable:false})
    getPrice!: number;

    @Field(() => Int, {nullable:false})
    quantity!: number;

    @Field(() => Float, {nullable:false})
    dividend!: number;

    @Field(() => Int, {nullable:false})
    dividendTime!: number;

    @Field(() => Int, {nullable:false})
    dividendFirstTime!: number;

    @Field(() => String, {nullable:false})
    sector!: string;

    @Field(() => Float, {nullable:false})
    usdjpy!: number;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => TickerCountAggregate, {nullable:true})
    _count?: TickerCountAggregate;

    @Field(() => TickerAvgAggregate, {nullable:true})
    _avg?: TickerAvgAggregate;

    @Field(() => TickerSumAggregate, {nullable:true})
    _sum?: TickerSumAggregate;

    @Field(() => TickerMinAggregate, {nullable:true})
    _min?: TickerMinAggregate;

    @Field(() => TickerMaxAggregate, {nullable:true})
    _max?: TickerMaxAggregate;
}
