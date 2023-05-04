import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { FloatFilter } from '../prisma/float-filter.input';

@InputType()
export class TickerWhereInput {

    @Field(() => [TickerWhereInput], {nullable:true})
    AND?: Array<TickerWhereInput>;

    @Field(() => [TickerWhereInput], {nullable:true})
    OR?: Array<TickerWhereInput>;

    @Field(() => [TickerWhereInput], {nullable:true})
    NOT?: Array<TickerWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    ticker?: StringFilter;

    @Field(() => FloatFilter, {nullable:true})
    getPrice?: FloatFilter;

    @Field(() => IntFilter, {nullable:true})
    quantity?: IntFilter;

    @Field(() => FloatFilter, {nullable:true})
    dividend?: FloatFilter;

    @Field(() => IntFilter, {nullable:true})
    dividendTime?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    dividendFirstTime?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    sector?: StringFilter;

    @Field(() => FloatFilter, {nullable:true})
    usdjpy?: FloatFilter;

    @Field(() => IntFilter, {nullable:true})
    userId?: IntFilter;
}
