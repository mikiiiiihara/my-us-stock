import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { StrategyCreateManyInput } from './strategy-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyStrategyArgs {

    @Field(() => [StrategyCreateManyInput], {nullable:false})
    @Type(() => StrategyCreateManyInput)
    data!: Array<StrategyCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
