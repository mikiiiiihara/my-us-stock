import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { AssetCountAggregate } from './asset-count-aggregate.output';
import { AssetAvgAggregate } from './asset-avg-aggregate.output';
import { AssetSumAggregate } from './asset-sum-aggregate.output';
import { AssetMinAggregate } from './asset-min-aggregate.output';
import { AssetMaxAggregate } from './asset-max-aggregate.output';

@ObjectType()
export class AggregateAsset {

    @Field(() => AssetCountAggregate, {nullable:true})
    _count?: AssetCountAggregate;

    @Field(() => AssetAvgAggregate, {nullable:true})
    _avg?: AssetAvgAggregate;

    @Field(() => AssetSumAggregate, {nullable:true})
    _sum?: AssetSumAggregate;

    @Field(() => AssetMinAggregate, {nullable:true})
    _min?: AssetMinAggregate;

    @Field(() => AssetMaxAggregate, {nullable:true})
    _max?: AssetMaxAggregate;
}
