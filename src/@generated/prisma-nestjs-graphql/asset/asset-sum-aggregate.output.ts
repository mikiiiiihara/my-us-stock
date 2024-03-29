import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class AssetSumAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Float, {nullable:true})
    asset?: number;

    @Field(() => Float, {nullable:true})
    cashUSD?: number;

    @Field(() => Int, {nullable:true})
    cashJPY?: number;

    @Field(() => Float, {nullable:true})
    cashBTC?: number;

    @Field(() => Float, {nullable:true})
    cashETH?: number;

    @Field(() => Float, {nullable:true})
    cashRIPPLE?: number;

    @Field(() => Float, {nullable:true})
    cashBAT?: number;

    @Field(() => Float, {nullable:true})
    cashLTC?: number;

    @Field(() => Float, {nullable:true})
    total?: number;
}
