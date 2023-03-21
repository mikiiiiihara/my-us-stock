import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { StrategyWhereInput } from './strategy-where.input';
import { Type } from 'class-transformer';
import { StrategyOrderByWithAggregationInput } from './strategy-order-by-with-aggregation.input';
import { StrategyScalarFieldEnum } from './strategy-scalar-field.enum';
import { StrategyScalarWhereWithAggregatesInput } from './strategy-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { StrategyCountAggregateInput } from './strategy-count-aggregate.input';
import { StrategyAvgAggregateInput } from './strategy-avg-aggregate.input';
import { StrategySumAggregateInput } from './strategy-sum-aggregate.input';
import { StrategyMinAggregateInput } from './strategy-min-aggregate.input';
import { StrategyMaxAggregateInput } from './strategy-max-aggregate.input';

@ArgsType()
export class StrategyGroupByArgs {

    @Field(() => StrategyWhereInput, {nullable:true})
    @Type(() => StrategyWhereInput)
    where?: StrategyWhereInput;

    @Field(() => [StrategyOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<StrategyOrderByWithAggregationInput>;

    @Field(() => [StrategyScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof StrategyScalarFieldEnum>;

    @Field(() => StrategyScalarWhereWithAggregatesInput, {nullable:true})
    having?: StrategyScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => StrategyCountAggregateInput, {nullable:true})
    _count?: StrategyCountAggregateInput;

    @Field(() => StrategyAvgAggregateInput, {nullable:true})
    _avg?: StrategyAvgAggregateInput;

    @Field(() => StrategySumAggregateInput, {nullable:true})
    _sum?: StrategySumAggregateInput;

    @Field(() => StrategyMinAggregateInput, {nullable:true})
    _min?: StrategyMinAggregateInput;

    @Field(() => StrategyMaxAggregateInput, {nullable:true})
    _max?: StrategyMaxAggregateInput;
}
