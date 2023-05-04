import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { FloatWithAggregatesFilter } from '../prisma/float-with-aggregates-filter.input';

@InputType()
export class TickerScalarWhereWithAggregatesInput {

    @Field(() => [TickerScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<TickerScalarWhereWithAggregatesInput>;

    @Field(() => [TickerScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<TickerScalarWhereWithAggregatesInput>;

    @Field(() => [TickerScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<TickerScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    ticker?: StringWithAggregatesFilter;

    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    getPrice?: FloatWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    quantity?: IntWithAggregatesFilter;

    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    dividend?: FloatWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    dividendTime?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    dividendFirstTime?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    sector?: StringWithAggregatesFilter;

    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    usdjpy?: FloatWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    userId?: IntWithAggregatesFilter;
}
