import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { FloatWithAggregatesFilter } from '../prisma/float-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class AssetScalarWhereWithAggregatesInput {

    @Field(() => [AssetScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<AssetScalarWhereWithAggregatesInput>;

    @Field(() => [AssetScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<AssetScalarWhereWithAggregatesInput>;

    @Field(() => [AssetScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<AssetScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    asset?: FloatWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    year?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    month?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    date?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    addDate?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    updDate?: StringWithAggregatesFilter;

    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    cashUSD?: FloatWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    cashJPY?: IntWithAggregatesFilter;

    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    cashBTC?: FloatWithAggregatesFilter;

    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    cashETH?: FloatWithAggregatesFilter;

    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    cashRIPPLE?: FloatWithAggregatesFilter;

    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    cashBAT?: FloatWithAggregatesFilter;

    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    cashLTC?: FloatWithAggregatesFilter;

    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    total?: FloatWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    userId?: IntWithAggregatesFilter;
}
