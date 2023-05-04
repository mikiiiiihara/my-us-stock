import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: number;

    /**
     * @Validator.@IsEmail()
     */
    @Field(() => String, {nullable:false,description:'@Validator.@IsEmail()'})
    email!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @HideField()
    password!: string;

    @HideField()
    hashedRefreshToken!: string | null;

    @HideField()
    createdAt!: Date;

    @HideField()
    updatedAt!: Date;
}
