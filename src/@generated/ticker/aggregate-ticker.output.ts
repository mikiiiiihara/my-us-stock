import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { TickerCountAggregate } from './ticker-count-aggregate.output';
import { TickerAvgAggregate } from './ticker-avg-aggregate.output';
import { TickerSumAggregate } from './ticker-sum-aggregate.output';
import { TickerMinAggregate } from './ticker-min-aggregate.output';
import { TickerMaxAggregate } from './ticker-max-aggregate.output';

@ObjectType()
export class AggregateTicker {

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
