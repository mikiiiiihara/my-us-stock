/*
  Warnings:

  - You are about to drop the `Setting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Watchlist` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cashBAT` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cashBTC` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cashETH` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cashLTC` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cashRIPPLE` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "cashBAT" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cashBTC" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cashETH" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cashLTC" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cashRIPPLE" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Setting";

-- DropTable
DROP TABLE "Watchlist";
