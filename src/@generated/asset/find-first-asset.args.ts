import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AssetWhereInput } from './asset-where.input';
import { Type } from 'class-transformer';
import { AssetOrderByWithRelationInput } from './asset-order-by-with-relation.input';
import { AssetWhereUniqueInput } from './asset-where-unique.input';
import { Int } from '@nestjs/graphql';
import { AssetScalarFieldEnum } from './asset-scalar-field.enum';

@ArgsType()
export class FindFirstAssetArgs {

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

    @Field(() => [AssetScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof AssetScalarFieldEnum>;
}
