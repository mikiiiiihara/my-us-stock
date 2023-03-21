import { registerEnumType } from '@nestjs/graphql';

export enum TickerScalarFieldEnum {
    id = "id",
    ticker = "ticker",
    getPrice = "getPrice",
    quantity = "quantity",
    user = "user",
    dividend = "dividend",
    dividendTime = "dividendTime",
    dividendFirstTime = "dividendFirstTime",
    sector = "sector",
    usdjpy = "usdjpy"
}


registerEnumType(TickerScalarFieldEnum, { name: 'TickerScalarFieldEnum', description: undefined })
