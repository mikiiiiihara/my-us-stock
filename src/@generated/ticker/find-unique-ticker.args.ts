import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TickerWhereUniqueInput } from './ticker-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueTickerArgs {

    @Field(() => TickerWhereUniqueInput, {nullable:false})
    @Type(() => TickerWhereUniqueInput)
    where!: TickerWhereUniqueInput;
}
