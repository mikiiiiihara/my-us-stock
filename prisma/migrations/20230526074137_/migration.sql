/*
  Warnings:

  - You are about to drop the column `dividend` on the `Ticker` table. All the data in the column will be lost.
  - You are about to drop the column `dividendFirstTime` on the `Ticker` table. All the data in the column will be lost.
  - You are about to drop the column `dividendTime` on the `Ticker` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticker" DROP COLUMN "dividend",
DROP COLUMN "dividendFirstTime",
DROP COLUMN "dividendTime";
