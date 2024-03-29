import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class StrategyMaxAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:true})
    text?: string;

    @Field(() => String, {nullable:true})
    addDate?: string;

    @Field(() => String, {nullable:true})
    updDate?: string;

    @Field(() => String, {nullable:true})
    userId?: string;
}
