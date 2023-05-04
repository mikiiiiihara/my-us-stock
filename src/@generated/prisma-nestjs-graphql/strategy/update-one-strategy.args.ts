import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { StrategyUpdateInput } from './strategy-update.input';
import { Type } from 'class-transformer';
import { StrategyWhereUniqueInput } from './strategy-where-unique.input';

@ArgsType()
export class UpdateOneStrategyArgs {

    @Field(() => StrategyUpdateInput, {nullable:false})
    @Type(() => StrategyUpdateInput)
    data!: StrategyUpdateInput;

    @Field(() => StrategyWhereUniqueInput, {nullable:false})
    @Type(() => StrategyWhereUniqueInput)
    where!: StrategyWhereUniqueInput;
}
