import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class AssetAvgAggregate {

    @Field(() => Float, {nullable:true})
    id?: number;

    @Field(() => Float, {nullable:true})
    asset?: number;

    @Field(() => Float, {nullable:true})
    cashUSD?: number;

    @Field(() => Float, {nullable:true})
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

    @Field(() => Float, {nullable:true})
    userId?: number;
}
