/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `Phase` table. All the data in the column will be lost.
  - You are about to drop the column `maxLevel` on the `Phase` table. All the data in the column will be lost.
  - You are about to drop the column `minLevel` on the `Phase` table. All the data in the column will be lost.
  - You are about to drop the column `possibleAnswers` on the `Phase` table. All the data in the column will be lost.
  - The `image` column on the `Phase` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `levelId` to the `Phase` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Phase` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LevelName" AS ENUM ('Basic', 'Intermediate', 'Advanced');

-- CreateEnum
CREATE TYPE "PhaseType" AS ENUM ('explanation', 'quiz');

-- AlterTable
ALTER TABLE "Phase" DROP COLUMN "correctAnswer",
DROP COLUMN "maxLevel",
DROP COLUMN "minLevel",
DROP COLUMN "possibleAnswers",
ADD COLUMN     "correctResponse" TEXT,
ADD COLUMN     "levelId" TEXT NOT NULL,
ADD COLUMN     "possibleResponses" TEXT[],
ADD COLUMN     "responseJustificationImage" TEXT,
ADD COLUMN     "responseJustificationText" TEXT,
ADD COLUMN     "secondImage" TEXT,
ADD COLUMN     "secondText" TEXT,
DROP COLUMN "image",
ADD COLUMN     "image" BYTEA,
DROP COLUMN "type",
ADD COLUMN     "type" "PhaseType" NOT NULL;

-- CreateTable
CREATE TABLE "Level" (
    "id" TEXT NOT NULL,
    "name" "LevelName" NOT NULL,
    "description" TEXT,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Phase" ADD CONSTRAINT "Phase_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
