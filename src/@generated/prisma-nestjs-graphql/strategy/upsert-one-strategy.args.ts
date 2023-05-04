import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { StrategyWhereUniqueInput } from './strategy-where-unique.input';
import { Type } from 'class-transformer';
import { StrategyCreateInput } from './strategy-create.input';
import { StrategyUpdateInput } from './strategy-update.input';

@ArgsType()
export class UpsertOneStrategyArgs {

    @Field(() => StrategyWhereUniqueInput, {nullable:false})
    @Type(() => StrategyWhereUniqueInput)
    where!: StrategyWhereUniqueInput;

    @Field(() => StrategyCreateInput, {nullable:false})
    @Type(() => StrategyCreateInput)
    create!: StrategyCreateInput;

    @Field(() => StrategyUpdateInput, {nullable:false})
    @Type(() => StrategyUpdateInput)
    update!: StrategyUpdateInput;
}
