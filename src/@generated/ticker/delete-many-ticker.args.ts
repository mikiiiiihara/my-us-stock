import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TickerWhereInput } from './ticker-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyTickerArgs {

    @Field(() => TickerWhereInput, {nullable:true})
    @Type(() => TickerWhereInput)
    where?: TickerWhereInput;
}
