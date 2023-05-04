import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class StrategyScalarWhereWithAggregatesInput {

    @Field(() => [StrategyScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<StrategyScalarWhereWithAggregatesInput>;

    @Field(() => [StrategyScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<StrategyScalarWhereWithAggregatesInput>;

    @Field(() => [StrategyScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<StrategyScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    text?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    addDate?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    updDate?: StringWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    userId?: IntWithAggregatesFilter;
}
