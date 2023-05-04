import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TickerCreateInput } from './ticker-create.input';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@ArgsType()
export class CreateOneTickerArgs {

    @Field(() => TickerCreateInput, {nullable:false})
    @Type(() => TickerCreateInput)
    @ValidateNested()
    @Type(() => TickerCreateInput)
    data!: TickerCreateInput;
}
