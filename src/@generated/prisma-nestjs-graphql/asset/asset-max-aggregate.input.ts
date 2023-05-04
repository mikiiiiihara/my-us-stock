import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class AssetMaxAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    asset?: true;

    @Field(() => Boolean, {nullable:true})
    year?: true;

    @Field(() => Boolean, {nullable:true})
    month?: true;

    @Field(() => Boolean, {nullable:true})
    date?: true;

    @Field(() => Boolean, {nullable:true})
    addDate?: true;

    @Field(() => Boolean, {nullable:true})
    updDate?: true;

    @Field(() => Boolean, {nullable:true})
    cashUSD?: true;

    @Field(() => Boolean, {nullable:true})
    cashJPY?: true;

    @Field(() => Boolean, {nullable:true})
    cashBTC?: true;

    @Field(() => Boolean, {nullable:true})
    cashETH?: true;

    @Field(() => Boolean, {nullable:true})
    cashRIPPLE?: true;

    @Field(() => Boolean, {nullable:true})
    cashBAT?: true;

    @Field(() => Boolean, {nullable:true})
    cashLTC?: true;

    @Field(() => Boolean, {nullable:true})
    total?: true;

    @Field(() => Boolean, {nullable:true})
    userId?: true;
}
