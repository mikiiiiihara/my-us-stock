import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AssetWhereUniqueInput } from './asset-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneAssetArgs {

    @Field(() => AssetWhereUniqueInput, {nullable:false})
    @Type(() => AssetWhereUniqueInput)
    where!: AssetWhereUniqueInput;
}
