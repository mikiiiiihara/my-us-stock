/*
  Warnings:

  - You are about to drop the column `user` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Strategy` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Ticker` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Strategy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Ticker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "user",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Strategy" DROP COLUMN "user",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ticker" DROP COLUMN "user",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hashedRefreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
