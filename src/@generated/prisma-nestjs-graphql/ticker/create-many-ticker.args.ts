import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TickerCreateManyInput } from './ticker-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyTickerArgs {

    @Field(() => [TickerCreateManyInput], {nullable:false})
    @Type(() => TickerCreateManyInput)
    data!: Array<TickerCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
