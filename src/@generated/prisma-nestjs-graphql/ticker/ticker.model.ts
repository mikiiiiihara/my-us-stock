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

    @Field(() => String, {nullable:false})
    sector!: string;

    @Field(() => Float, {nullable:false})
    usdjpy!: number;

    @Field(() => String, {nullable:false})
    userId!: string;
}
