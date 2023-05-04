import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TickerWhereUniqueInput } from './ticker-where-unique.input';
import { Type } from 'class-transformer';
import { TickerCreateInput } from './ticker-create.input';
import { TickerUpdateInput } from './ticker-update.input';

@ArgsType()
export class UpsertOneTickerArgs {

    @Field(() => TickerWhereUniqueInput, {nullable:false})
    @Type(() => TickerWhereUniqueInput)
    where!: TickerWhereUniqueInput;

    @Field(() => TickerCreateInput, {nullable:false})
    @Type(() => TickerCreateInput)
    create!: TickerCreateInput;

    @Field(() => TickerUpdateInput, {nullable:false})
    @Type(() => TickerUpdateInput)
    update!: TickerUpdateInput;
}
