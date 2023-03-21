import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TickerUpdateManyMutationInput } from './ticker-update-many-mutation.input';
import { Type } from 'class-transformer';
import { TickerWhereInput } from './ticker-where.input';

@ArgsType()
export class UpdateManyTickerArgs {

    @Field(() => TickerUpdateManyMutationInput, {nullable:false})
    @Type(() => TickerUpdateManyMutationInput)
    data!: TickerUpdateManyMutationInput;

    @Field(() => TickerWhereInput, {nullable:true})
    @Type(() => TickerWhereInput)
    where?: TickerWhereInput;
}
