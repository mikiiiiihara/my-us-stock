import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TickerCreateInput } from './ticker-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneTickerArgs {

    @Field(() => TickerCreateInput, {nullable:false})
    @Type(() => TickerCreateInput)
    data!: TickerCreateInput;
}
