import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TickerUpdateInput } from './ticker-update.input';
import { Type } from 'class-transformer';
import { TickerWhereUniqueInput } from './ticker-where-unique.input';

@ArgsType()
export class UpdateOneTickerArgs {

    @Field(() => TickerUpdateInput, {nullable:false})
    @Type(() => TickerUpdateInput)
    data!: TickerUpdateInput;

    @Field(() => TickerWhereUniqueInput, {nullable:false})
    @Type(() => TickerWhereUniqueInput)
    where!: TickerWhereUniqueInput;
}
