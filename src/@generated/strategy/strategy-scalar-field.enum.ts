import { registerEnumType } from '@nestjs/graphql';

export enum StrategyScalarFieldEnum {
    id = "id",
    text = "text",
    user = "user",
    addDate = "addDate",
    updDate = "updDate"
}


registerEnumType(StrategyScalarFieldEnum, { name: 'StrategyScalarFieldEnum', description: undefined })
