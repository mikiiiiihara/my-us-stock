import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { AssetCountOrderByAggregateInput } from './asset-count-order-by-aggregate.input';
import { AssetAvgOrderByAggregateInput } from './asset-avg-order-by-aggregate.input';
import { AssetMaxOrderByAggregateInput } from './asset-max-order-by-aggregate.input';
import { AssetMinOrderByAggregateInput } from './asset-min-order-by-aggregate.input';
import { AssetSumOrderByAggregateInput } from './asset-sum-order-by-aggregate.input';

@InputType()
export class AssetOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    asset?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    year?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    month?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    date?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    addDate?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updDate?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    cashUSD?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    cashJPY?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    cashBTC?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    cashETH?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    cashRIPPLE?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    cashBAT?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    cashLTC?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    total?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    userId?: keyof typeof SortOrder;

    @Field(() => AssetCountOrderByAggregateInput, {nullable:true})
    _count?: AssetCountOrderByAggregateInput;

    @Field(() => AssetAvgOrderByAggregateInput, {nullable:true})
    _avg?: AssetAvgOrderByAggregateInput;

    @Field(() => AssetMaxOrderByAggregateInput, {nullable:true})
    _max?: AssetMaxOrderByAggregateInput;

    @Field(() => AssetMinOrderByAggregateInput, {nullable:true})
    _min?: AssetMinOrderByAggregateInput;

    @Field(() => AssetSumOrderByAggregateInput, {nullable:true})
    _sum?: AssetSumOrderByAggregateInput;
}
