import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class Ticker {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    ticker!: string;

    @Field(() => Float, {nullable:false})
    getPrice!: number;

    @Field(() => Int, {nullable:false})
    quantity!: number;

    @Field(() => Float, {nullable:false})
    dividend!: number;

    @Field(() => Int, {nullable:false})
    dividendTime!: number;

    @Field(() => Int, {nullable:false})
    dividendFirstTime!: number;

    @Field(() => String, {nullable:false})
    sector!: string;

    @Field(() => Float, {nullable:false})
    usdjpy!: number;

    @Field(() => Int, {nullable:false})
    userId!: number;
}
