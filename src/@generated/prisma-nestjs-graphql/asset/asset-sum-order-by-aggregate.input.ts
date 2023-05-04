import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class AssetSumOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    asset?: keyof typeof SortOrder;

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
}
