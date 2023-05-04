import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class AssetCountOrderByAggregateInput {

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
}
