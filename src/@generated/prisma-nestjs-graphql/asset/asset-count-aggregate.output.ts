import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class AssetCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    asset!: number;

    @Field(() => Int, {nullable:false})
    year!: number;

    @Field(() => Int, {nullable:false})
    month!: number;

    @Field(() => Int, {nullable:false})
    date!: number;

    @Field(() => Int, {nullable:false})
    addDate!: number;

    @Field(() => Int, {nullable:false})
    updDate!: number;

    @Field(() => Int, {nullable:false})
    cashUSD!: number;

    @Field(() => Int, {nullable:false})
    cashJPY!: number;

    @Field(() => Int, {nullable:false})
    cashBTC!: number;

    @Field(() => Int, {nullable:false})
    cashETH!: number;

    @Field(() => Int, {nullable:false})
    cashRIPPLE!: number;

    @Field(() => Int, {nullable:false})
    cashBAT!: number;

    @Field(() => Int, {nullable:false})
    cashLTC!: number;

    @Field(() => Int, {nullable:false})
    total!: number;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
