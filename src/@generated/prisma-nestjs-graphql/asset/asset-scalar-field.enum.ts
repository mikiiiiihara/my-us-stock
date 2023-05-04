import { registerEnumType } from '@nestjs/graphql';

export enum AssetScalarFieldEnum {
    id = "id",
    asset = "asset",
    year = "year",
    month = "month",
    date = "date",
    addDate = "addDate",
    updDate = "updDate",
    cashUSD = "cashUSD",
    cashJPY = "cashJPY",
    cashBTC = "cashBTC",
    cashETH = "cashETH",
    cashRIPPLE = "cashRIPPLE",
    cashBAT = "cashBAT",
    cashLTC = "cashLTC",
    total = "total",
    userId = "userId"
}


registerEnumType(AssetScalarFieldEnum, { name: 'AssetScalarFieldEnum', description: undefined })
