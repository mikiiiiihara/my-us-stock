import { registerEnumType } from '@nestjs/graphql';

export enum StrategyScalarFieldEnum {
    id = "id",
    text = "text",
    addDate = "addDate",
    updDate = "updDate",
    userId = "userId"
}


registerEnumType(StrategyScalarFieldEnum, { name: 'StrategyScalarFieldEnum', description: undefined })
