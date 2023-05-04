import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AssetCreateInput } from './asset-create.input';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@ArgsType()
export class CreateOneAssetArgs {

    @Field(() => AssetCreateInput, {nullable:false})
    @Type(() => AssetCreateInput)
    @ValidateNested()
    @Type(() => AssetCreateInput)
    data!: AssetCreateInput;
}
