import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TickerWhereInput } from './ticker-where.input';
import { Type } from 'class-transformer';
import { TickerOrderByWithRelationInput } from './ticker-order-by-with-relation.input';
import { TickerWhereUniqueInput } from './ticker-where-unique.input';
import { Int } from '@nestjs/graphql';
import { TickerScalarFieldEnum } from './ticker-scalar-field.enum';

@ArgsType()
export class FindFirstTickerArgs {

    @Field(() => TickerWhereInput, {nullable:true})
    @Type(() => TickerWhereInput)
    where?: TickerWhereInput;

    @Field(() => [TickerOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<TickerOrderByWithRelationInput>;

    @Field(() => TickerWhereUniqueInput, {nullable:true})
    cursor?: TickerWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [TickerScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof TickerScalarFieldEnum>;
}
