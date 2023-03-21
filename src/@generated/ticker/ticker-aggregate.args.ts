import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TickerWhereInput } from './ticker-where.input';
import { Type } from 'class-transformer';
import { TickerOrderByWithRelationInput } from './ticker-order-by-with-relation.input';
import { TickerWhereUniqueInput } from './ticker-where-unique.input';
import { Int } from '@nestjs/graphql';
import { TickerCountAggregateInput } from './ticker-count-aggregate.input';
import { TickerAvgAggregateInput } from './ticker-avg-aggregate.input';
import { TickerSumAggregateInput } from './ticker-sum-aggregate.input';
import { TickerMinAggregateInput } from './ticker-min-aggregate.input';
import { TickerMaxAggregateInput } from './ticker-max-aggregate.input';

@ArgsType()
export class TickerAggregateArgs {

    @Field(() => TickerWhereInput, {nullable:true})
    @Type(() => TickerWhereInput)
    where?: TickerWhereInput;

    @Field(() => [TickerOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<TickerOrderByWithRelationInput>;

    @Field(() => TickerWhereUniqueInput, {nullable:true})
    cursor?: TickerWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => TickerCountAggregateInput, {nullable:true})
    _count?: TickerCountAggregateInput;

    @Field(() => TickerAvgAggregateInput, {nullable:true})
    _avg?: TickerAvgAggregateInput;

    @Field(() => TickerSumAggregateInput, {nullable:true})
    _sum?: TickerSumAggregateInput;

    @Field(() => TickerMinAggregateInput, {nullable:true})
    _min?: TickerMinAggregateInput;

    @Field(() => TickerMaxAggregateInput, {nullable:true})
    _max?: TickerMaxAggregateInput;
}
