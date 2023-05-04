import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class Strategy {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    text!: string;

    @Field(() => String, {nullable:false})
    addDate!: string;

    @Field(() => String, {nullable:false})
    updDate!: string;

    @Field(() => Int, {nullable:false})
    userId!: number;
}
