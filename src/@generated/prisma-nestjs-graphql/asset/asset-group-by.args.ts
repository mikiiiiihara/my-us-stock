import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AssetWhereInput } from './asset-where.input';
import { Type } from 'class-transformer';
import { AssetOrderByWithAggregationInput } from './asset-order-by-with-aggregation.input';
import { AssetScalarFieldEnum } from './asset-scalar-field.enum';
import { AssetScalarWhereWithAggregatesInput } from './asset-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { AssetCountAggregateInput } from './asset-count-aggregate.input';
import { AssetAvgAggregateInput } from './asset-avg-aggregate.input';
import { AssetSumAggregateInput } from './asset-sum-aggregate.input';
import { AssetMinAggregateInput } from './asset-min-aggregate.input';
import { AssetMaxAggregateInput } from './asset-max-aggregate.input';

@ArgsType()
export class AssetGroupByArgs {

    @Field(() => AssetWhereInput, {nullable:true})
    @Type(() => AssetWhereInput)
    where?: AssetWhereInput;

    @Field(() => [AssetOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<AssetOrderByWithAggregationInput>;

    @Field(() => [AssetScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof AssetScalarFieldEnum>;

    @Field(() => AssetScalarWhereWithAggregatesInput, {nullable:true})
    having?: AssetScalarWhereWithAggregatesInput;

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
