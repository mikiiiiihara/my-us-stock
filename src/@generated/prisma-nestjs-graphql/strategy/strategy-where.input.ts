import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class StrategyWhereInput {

    @Field(() => [StrategyWhereInput], {nullable:true})
    AND?: Array<StrategyWhereInput>;

    @Field(() => [StrategyWhereInput], {nullable:true})
    OR?: Array<StrategyWhereInput>;

    @Field(() => [StrategyWhereInput], {nullable:true})
    NOT?: Array<StrategyWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    text?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    addDate?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    updDate?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    userId?: IntFilter;
}
