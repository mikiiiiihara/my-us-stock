import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class StrategyCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    text!: number;

    @Field(() => Int, {nullable:false})
    user!: number;

    @Field(() => Int, {nullable:false})
    addDate!: number;

    @Field(() => Int, {nullable:false})
    updDate!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
