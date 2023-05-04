import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { StrategyCountOrderByAggregateInput } from './strategy-count-order-by-aggregate.input';
import { StrategyAvgOrderByAggregateInput } from './strategy-avg-order-by-aggregate.input';
import { StrategyMaxOrderByAggregateInput } from './strategy-max-order-by-aggregate.input';
import { StrategyMinOrderByAggregateInput } from './strategy-min-order-by-aggregate.input';
import { StrategySumOrderByAggregateInput } from './strategy-sum-order-by-aggregate.input';

@InputType()
export class StrategyOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    text?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    addDate?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updDate?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    userId?: keyof typeof SortOrder;

    @Field(() => StrategyCountOrderByAggregateInput, {nullable:true})
    _count?: StrategyCountOrderByAggregateInput;

    @Field(() => StrategyAvgOrderByAggregateInput, {nullable:true})
    _avg?: StrategyAvgOrderByAggregateInput;

    @Field(() => StrategyMaxOrderByAggregateInput, {nullable:true})
    _max?: StrategyMaxOrderByAggregateInput;

    @Field(() => StrategyMinOrderByAggregateInput, {nullable:true})
    _min?: StrategyMinOrderByAggregateInput;

    @Field(() => StrategySumOrderByAggregateInput, {nullable:true})
    _sum?: StrategySumOrderByAggregateInput;
}
