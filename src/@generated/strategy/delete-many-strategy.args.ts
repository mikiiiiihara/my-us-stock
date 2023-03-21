import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { StrategyWhereInput } from './strategy-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyStrategyArgs {

    @Field(() => StrategyWhereInput, {nullable:true})
    @Type(() => StrategyWhereInput)
    where?: StrategyWhereInput;
}
