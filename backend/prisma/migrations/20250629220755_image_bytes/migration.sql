/*
  Warnings:

  - The `secondImage` column on the `Phase` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Phase" DROP COLUMN "secondImage",
ADD COLUMN     "secondImage" BYTEA;
