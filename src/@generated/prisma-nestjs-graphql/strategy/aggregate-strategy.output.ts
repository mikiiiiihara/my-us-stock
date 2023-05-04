import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { StrategyCountAggregate } from './strategy-count-aggregate.output';
import { StrategyAvgAggregate } from './strategy-avg-aggregate.output';
import { StrategySumAggregate } from './strategy-sum-aggregate.output';
import { StrategyMinAggregate } from './strategy-min-aggregate.output';
import { StrategyMaxAggregate } from './strategy-max-aggregate.output';

@ObjectType()
export class AggregateStrategy {

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
