import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { StrategyUpdateManyMutationInput } from './strategy-update-many-mutation.input';
import { Type } from 'class-transformer';
import { StrategyWhereInput } from './strategy-where.input';

@ArgsType()
export class UpdateManyStrategyArgs {

    @Field(() => StrategyUpdateManyMutationInput, {nullable:false})
    @Type(() => StrategyUpdateManyMutationInput)
    data!: StrategyUpdateManyMutationInput;

    @Field(() => StrategyWhereInput, {nullable:true})
    @Type(() => StrategyWhereInput)
    where?: StrategyWhereInput;
}
