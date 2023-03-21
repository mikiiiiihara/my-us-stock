import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AssetCreateManyInput } from './asset-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyAssetArgs {

    @Field(() => [AssetCreateManyInput], {nullable:false})
    @Type(() => AssetCreateManyInput)
    data!: Array<AssetCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
