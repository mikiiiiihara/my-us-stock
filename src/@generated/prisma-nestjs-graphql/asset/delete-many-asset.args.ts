import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AssetWhereInput } from './asset-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyAssetArgs {

    @Field(() => AssetWhereInput, {nullable:true})
    @Type(() => AssetWhereInput)
    where?: AssetWhereInput;
}
