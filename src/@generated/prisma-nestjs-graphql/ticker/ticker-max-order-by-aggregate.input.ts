import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class TickerMaxOrderByAggregateInput {

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
}
