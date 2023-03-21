import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AssetWhereInput } from './asset-where.input';
import { Type } from 'class-transformer';
import { AssetOrderByWithRelationInput } from './asset-order-by-with-relation.input';
import { AssetWhereUniqueInput } from './asset-where-unique.input';
import { Int } from '@nestjs/graphql';
import { AssetCountAggregateInput } from './asset-count-aggregate.input';
import { AssetAvgAggregateInput } from './asset-avg-aggregate.input';
import { AssetSumAggregateInput } from './asset-sum-aggregate.input';
import { AssetMinAggregateInput } from './asset-min-aggregate.input';
import { AssetMaxAggregateInput } from './asset-max-aggregate.input';

@ArgsType()
export class AssetAggregateArgs {

    @Field(() => AssetWhereInput, {nullable:true})
    @Type(() => AssetWhereInput)
    where?: AssetWhereInput;

    @Field(() => [AssetOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<AssetOrderByWithRelationInput>;

    @Field(() => AssetWhereUniqueInput, {nullable:true})
    cursor?: AssetWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => AssetCountAggregateInput, {nullable:true})
    _count?: AssetCountAggregateInput;

    @Field(() => AssetAvgAggregateInput, {nullable:true})
    _avg?: AssetAvgAggregateInput;

    @Field(() => AssetSumAggregateInput, {nullable:true})
    _sum?: AssetSumAggregateInput;

    @Field(() => AssetMinAggregateInput, {nullable:true})
    _min?: AssetMinAggregateInput;

    @Field(() => AssetMaxAggregateInput, {nullable:true})
    _max?: AssetMaxAggregateInput;
}
