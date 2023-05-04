import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { TickerCountOrderByAggregateInput } from './ticker-count-order-by-aggregate.input';
import { TickerAvgOrderByAggregateInput } from './ticker-avg-order-by-aggregate.input';
import { TickerMaxOrderByAggregateInput } from './ticker-max-order-by-aggregate.input';
import { TickerMinOrderByAggregateInput } from './ticker-min-order-by-aggregate.input';
import { TickerSumOrderByAggregateInput } from './ticker-sum-order-by-aggregate.input';

@InputType()
export class TickerOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    ticker?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    getPrice?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    quantity?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    dividend?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    dividendTime?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    dividendFirstTime?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    sector?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    usdjpy?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    userId?: keyof typeof SortOrder;

    @Field(() => TickerCountOrderByAggregateInput, {nullable:true})
    _count?: TickerCountOrderByAggregateInput;

    @Field(() => TickerAvgOrderByAggregateInput, {nullable:true})
    _avg?: TickerAvgOrderByAggregateInput;

    @Field(() => TickerMaxOrderByAggregateInput, {nullable:true})
    _max?: TickerMaxOrderByAggregateInput;

    @Field(() => TickerMinOrderByAggregateInput, {nullable:true})
    _min?: TickerMinOrderByAggregateInput;

    @Field(() => TickerSumOrderByAggregateInput, {nullable:true})
    _sum?: TickerSumOrderByAggregateInput;
}
