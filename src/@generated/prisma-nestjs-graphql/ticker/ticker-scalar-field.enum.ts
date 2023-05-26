import { registerEnumType } from '@nestjs/graphql';

export enum TickerScalarFieldEnum {
    id = "id",
    ticker = "ticker",
    getPrice = "getPrice",
    quantity = "quantity",
    sector = "sector",
    usdjpy = "usdjpy",
    userId = "userId"
}


registerEnumType(TickerScalarFieldEnum, { name: 'TickerScalarFieldEnum', description: undefined })
