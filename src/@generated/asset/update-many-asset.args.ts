import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AssetUpdateManyMutationInput } from './asset-update-many-mutation.input';
import { Type } from 'class-transformer';
import { AssetWhereInput } from './asset-where.input';

@ArgsType()
export class UpdateManyAssetArgs {

    @Field(() => AssetUpdateManyMutationInput, {nullable:false})
    @Type(() => AssetUpdateManyMutationInput)
    data!: AssetUpdateManyMutationInput;

    @Field(() => AssetWhereInput, {nullable:true})
    @Type(() => AssetWhereInput)
    where?: AssetWhereInput;
}
