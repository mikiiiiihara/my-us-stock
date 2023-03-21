import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class StrategyCreateInput {

    @Field(() => String, {nullable:false})
    text!: string;

    @Field(() => String, {nullable:false})
    user!: string;

    @Field(() => String, {nullable:false})
    addDate!: string;

    @Field(() => String, {nullable:false})
    updDate!: string;
}
