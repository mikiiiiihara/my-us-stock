import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { FloatFilter } from '../prisma/float-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class AssetWhereInput {

    @Field(() => [AssetWhereInput], {nullable:true})
    AND?: Array<AssetWhereInput>;

    @Field(() => [AssetWhereInput], {nullable:true})
    OR?: Array<AssetWhereInput>;

    @Field(() => [AssetWhereInput], {nullable:true})
    NOT?: Array<AssetWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => FloatFilter, {nullable:true})
    asset?: FloatFilter;

    @Field(() => StringFilter, {nullable:true})
    year?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    month?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    date?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    addDate?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    updDate?: StringFilter;

    @Field(() => FloatFilter, {nullable:true})
    cashUSD?: FloatFilter;

    @Field(() => IntFilter, {nullable:true})
    cashJPY?: IntFilter;

    @Field(() => FloatFilter, {nullable:true})
    cashBTC?: FloatFilter;

    @Field(() => FloatFilter, {nullable:true})
    cashETH?: FloatFilter;

    @Field(() => FloatFilter, {nullable:true})
    cashRIPPLE?: FloatFilter;

    @Field(() => FloatFilter, {nullable:true})
    cashBAT?: FloatFilter;

    @Field(() => FloatFilter, {nullable:true})
    cashLTC?: FloatFilter;

    @Field(() => FloatFilter, {nullable:true})
    total?: FloatFilter;

    @Field(() => IntFilter, {nullable:true})
    userId?: IntFilter;
}
