import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { StrategyWhereInput } from './strategy-where.input';
import { Type } from 'class-transformer';
import { StrategyOrderByWithRelationInput } from './strategy-order-by-with-relation.input';
import { StrategyWhereUniqueInput } from './strategy-where-unique.input';
import { Int } from '@nestjs/graphql';
import { StrategyCountAggregateInput } from './strategy-count-aggregate.input';
import { StrategyAvgAggregateInput } from './strategy-avg-aggregate.input';
import { StrategySumAggregateInput } from './strategy-sum-aggregate.input';
import { StrategyMinAggregateInput } from './strategy-min-aggregate.input';
import { StrategyMaxAggregateInput } from './strategy-max-aggregate.input';

@ArgsType()
export class StrategyAggregateArgs {

    @Field(() => StrategyWhereInput, {nullable:true})
    @Type(() => StrategyWhereInput)
    where?: StrategyWhereInput;

    @Field(() => [StrategyOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<StrategyOrderByWithRelationInput>;

    @Field(() => StrategyWhereUniqueInput, {nullable:true})
    cursor?: StrategyWhereUniqueInput;

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
