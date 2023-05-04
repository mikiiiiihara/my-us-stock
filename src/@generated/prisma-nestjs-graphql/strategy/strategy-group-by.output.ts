import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { StrategyCountAggregate } from './strategy-count-aggregate.output';
import { StrategyAvgAggregate } from './strategy-avg-aggregate.output';
import { StrategySumAggregate } from './strategy-sum-aggregate.output';
import { StrategyMinAggregate } from './strategy-min-aggregate.output';
import { StrategyMaxAggregate } from './strategy-max-aggregate.output';

@ObjectType()
export class StrategyGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    text!: string;

    @Field(() => String, {nullable:false})
    addDate!: string;

    @Field(() => String, {nullable:false})
    updDate!: string;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => StrategyCountAggregate, {nullable:true})
    _count?: StrategyCountAggregate;

    @Field(() => StrategyAvgAggregate, {nullable:true})
    _avg?: StrategyAvgAggregate;

    @Field(() => StrategySumAggregate, {nullable:true})
    _sum?: StrategySumAggregate;

    @Field(() => StrategyMinAggregate, {nullable:true})
    _min?: StrategyMinAggregate;

    @Field(() => StrategyMaxAggregate, {nullable:true})
    _max?: StrategyMaxAggregate;
}
