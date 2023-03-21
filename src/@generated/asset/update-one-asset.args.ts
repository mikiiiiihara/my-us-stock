import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AssetUpdateInput } from './asset-update.input';
import { Type } from 'class-transformer';
import { AssetWhereUniqueInput } from './asset-where-unique.input';

@ArgsType()
export class UpdateOneAssetArgs {

    @Field(() => AssetUpdateInput, {nullable:false})
    @Type(() => AssetUpdateInput)
    data!: AssetUpdateInput;

    @Field(() => AssetWhereUniqueInput, {nullable:false})
    @Type(() => AssetWhereUniqueInput)
    where!: AssetWhereUniqueInput;
}
