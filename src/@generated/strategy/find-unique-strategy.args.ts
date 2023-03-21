import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { StrategyWhereUniqueInput } from './strategy-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueStrategyArgs {

    @Field(() => StrategyWhereUniqueInput, {nullable:false})
    @Type(() => StrategyWhereUniqueInput)
    where!: StrategyWhereUniqueInput;
}
