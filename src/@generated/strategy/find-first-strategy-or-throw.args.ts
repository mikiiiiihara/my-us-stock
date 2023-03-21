import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { StrategyWhereInput } from './strategy-where.input';
import { Type } from 'class-transformer';
import { StrategyOrderByWithRelationInput } from './strategy-order-by-with-relation.input';
import { StrategyWhereUniqueInput } from './strategy-where-unique.input';
import { Int } from '@nestjs/graphql';
import { StrategyScalarFieldEnum } from './strategy-scalar-field.enum';

@ArgsType()
export class FindFirstStrategyOrThrowArgs {

    @Field(() => StrategyWhereInput, {nullable:true})
    @Type(() => StrategyWhereInput)
    where?: StrategyWhereInput;

    @Field(() => [StrategyOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<StrategyOrderByWithRelationInput>;

    @Field(() => StrategyWhereUniqueInput, {nullable:true})
    cursor?: StrategyWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [StrategyScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof StrategyScalarFieldEnum>;
}
