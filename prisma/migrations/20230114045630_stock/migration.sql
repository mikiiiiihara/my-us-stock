-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "asset" DOUBLE PRECISION NOT NULL,
    "year" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "addDate" TEXT NOT NULL,
    "updDate" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "cashUSD" DOUBLE PRECISION NOT NULL,
    "cashJPY" INTEGER NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" SERIAL NOT NULL,
    "theme" TEXT NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Strategy" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "addDate" TEXT NOT NULL,
    "updDate" TEXT NOT NULL,

    CONSTRAINT "Strategy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticker" (
    "id" SERIAL NOT NULL,
    "ticker" TEXT NOT NULL,
    "getPrice" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "dividend" DOUBLE PRECISION NOT NULL,
    "dividendTime" INTEGER NOT NULL,
    "dividendFirstTime" INTEGER NOT NULL,
    "sector" TEXT NOT NULL,
    "usdjpy" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Ticker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Watchlist" (
    "id" SERIAL NOT NULL,
    "ticker" TEXT NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id")
);
