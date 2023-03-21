import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AssetCreateInput } from './asset-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneAssetArgs {

    @Field(() => AssetCreateInput, {nullable:false})
    @Type(() => AssetCreateInput)
    data!: AssetCreateInput;
}
