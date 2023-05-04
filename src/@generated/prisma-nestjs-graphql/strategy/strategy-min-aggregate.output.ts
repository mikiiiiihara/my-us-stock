import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class StrategyMinAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:true})
    text?: string;

    @Field(() => String, {nullable:true})
    addDate?: string;

    @Field(() => String, {nullable:true})
    updDate?: string;

    @Field(() => Int, {nullable:true})
    userId?: number;
}
