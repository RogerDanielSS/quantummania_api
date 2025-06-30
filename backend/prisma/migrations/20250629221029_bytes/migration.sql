/*
  Warnings:

  - The `responseJustificationImage` column on the `Phase` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Phase" DROP COLUMN "responseJustificationImage",
ADD COLUMN     "responseJustificationImage" BYTEA;
