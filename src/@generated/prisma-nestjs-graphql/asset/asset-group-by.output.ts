import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { AssetCountAggregate } from './asset-count-aggregate.output';
import { AssetAvgAggregate } from './asset-avg-aggregate.output';
import { AssetSumAggregate } from './asset-sum-aggregate.output';
import { AssetMinAggregate } from './asset-min-aggregate.output';
import { AssetMaxAggregate } from './asset-max-aggregate.output';

@ObjectType()
export class AssetGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Float, {nullable:false})
    asset!: number;

    @Field(() => String, {nullable:false})
    year!: string;

    @Field(() => String, {nullable:false})
    month!: string;

    @Field(() => String, {nullable:false})
    date!: string;

    @Field(() => String, {nullable:false})
    addDate!: string;

    @Field(() => String, {nullable:false})
    updDate!: string;

    @Field(() => Float, {nullable:false})
    cashUSD!: number;

    @Field(() => Int, {nullable:false})
    cashJPY!: number;

    @Field(() => Float, {nullable:false})
    cashBTC!: number;

    @Field(() => Float, {nullable:false})
    cashETH!: number;

    @Field(() => Float, {nullable:false})
    cashRIPPLE!: number;

    @Field(() => Float, {nullable:false})
    cashBAT!: number;

    @Field(() => Float, {nullable:false})
    cashLTC!: number;

    @Field(() => Float, {nullable:false})
    total!: number;

    @Field(() => Int, {nullable:false})
    userId!: number;

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
