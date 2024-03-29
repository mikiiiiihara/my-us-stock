import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@InputType()
export class AssetUncheckedCreateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Float, {nullable:false})
    asset!: number;

    @Field(() => String, {nullable:false})
    year!: string;

    @Field(() => String, {nullable:false})
    month!: string;

    @Field(() => String, {nullable:false})
    date!: string;

    @Field(() => String, {nullable:false})
    addDate!: string;

    @Field(() => String, {nullable:false})
    updDate!: string;

    @Field(() => Float, {nullable:false})
    cashUSD!: number;

    @Field(() => Int, {nullable:false})
    cashJPY!: number;

    @Field(() => Float, {nullable:false})
    cashBTC!: number;

    @Field(() => Float, {nullable:false})
    cashETH!: number;

    @Field(() => Float, {nullable:false})
    cashRIPPLE!: number;

    @Field(() => Float, {nullable:false})
    cashBAT!: number;

    @Field(() => Float, {nullable:false})
    cashLTC!: number;

    @Field(() => Float, {nullable:false})
    total!: number;

    @Field(() => String, {nullable:false})
    userId!: string;
}
