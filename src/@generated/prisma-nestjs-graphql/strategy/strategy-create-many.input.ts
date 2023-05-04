import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class StrategyCreateManyInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:false})
    text!: string;

    @Field(() => String, {nullable:false})
    addDate!: string;

    @Field(() => String, {nullable:false})
    updDate!: string;

    @Field(() => Int, {nullable:false})
    userId!: number;
}
