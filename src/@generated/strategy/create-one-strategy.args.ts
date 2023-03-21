import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { StrategyCreateInput } from './strategy-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneStrategyArgs {

    @Field(() => StrategyCreateInput, {nullable:false})
    @Type(() => StrategyCreateInput)
    data!: StrategyCreateInput;
}
