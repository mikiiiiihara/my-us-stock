import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TickerWhereInput } from './ticker-where.input';
import { Type } from 'class-transformer';
import { TickerOrderByWithAggregationInput } from './ticker-order-by-with-aggregation.input';
import { TickerScalarFieldEnum } from './ticker-scalar-field.enum';
import { TickerScalarWhereWithAggregatesInput } from './ticker-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { TickerCountAggregateInput } from './ticker-count-aggregate.input';
import { TickerAvgAggregateInput } from './ticker-avg-aggregate.input';
import { TickerSumAggregateInput } from './ticker-sum-aggregate.input';
import { TickerMinAggregateInput } from './ticker-min-aggregate.input';
import { TickerMaxAggregateInput } from './ticker-max-aggregate.input';

@ArgsType()
export class TickerGroupByArgs {

    @Field(() => TickerWhereInput, {nullable:true})
    @Type(() => TickerWhereInput)
    where?: TickerWhereInput;

    @Field(() => [TickerOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<TickerOrderByWithAggregationInput>;

    @Field(() => [TickerScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof TickerScalarFieldEnum>;

    @Field(() => TickerScalarWhereWithAggregatesInput, {nullable:true})
    having?: TickerScalarWhereWithAggregatesInput;

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
