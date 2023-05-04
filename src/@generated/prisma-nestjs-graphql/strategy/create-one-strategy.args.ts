import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { StrategyCreateInput } from './strategy-create.input';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@ArgsType()
export class CreateOneStrategyArgs {

    @Field(() => StrategyCreateInput, {nullable:false})
    @Type(() => StrategyCreateInput)
    @ValidateNested()
    @Type(() => StrategyCreateInput)
    data!: StrategyCreateInput;
}
