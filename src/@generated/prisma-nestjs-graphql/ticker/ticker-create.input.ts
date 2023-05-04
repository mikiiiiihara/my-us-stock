import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class TickerCreateInput {

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
