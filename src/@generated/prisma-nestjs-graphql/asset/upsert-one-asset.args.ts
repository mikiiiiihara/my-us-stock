import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AssetWhereUniqueInput } from './asset-where-unique.input';
import { Type } from 'class-transformer';
import { AssetCreateInput } from './asset-create.input';
import { AssetUpdateInput } from './asset-update.input';

@ArgsType()
export class UpsertOneAssetArgs {

    @Field(() => AssetWhereUniqueInput, {nullable:false})
    @Type(() => AssetWhereUniqueInput)
    where!: AssetWhereUniqueInput;

    @Field(() => AssetCreateInput, {nullable:false})
    @Type(() => AssetCreateInput)
    create!: AssetCreateInput;

    @Field(() => AssetUpdateInput, {nullable:false})
    @Type(() => AssetUpdateInput)
    update!: AssetUpdateInput;
}
