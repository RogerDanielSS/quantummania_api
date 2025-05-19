/*
  Warnings:

  - The primary key for the `Achievement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Phase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PhaseUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Achievement" DROP CONSTRAINT "Achievement_userId_fkey";

-- DropForeignKey
ALTER TABLE "PhaseUser" DROP CONSTRAINT "PhaseUser_phaseId_fkey";

-- DropForeignKey
ALTER TABLE "PhaseUser" DROP CONSTRAINT "PhaseUser_userId_fkey";

-- AlterTable
ALTER TABLE "Achievement" DROP CONSTRAINT "Achievement_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Achievement_id_seq";

-- AlterTable
ALTER TABLE "Phase" DROP CONSTRAINT "Phase_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Phase_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Phase_id_seq";

-- AlterTable
ALTER TABLE "PhaseUser" DROP CONSTRAINT "PhaseUser_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "phaseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PhaseUser_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PhaseUser_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "PhaseUser" ADD CONSTRAINT "PhaseUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhaseUser" ADD CONSTRAINT "PhaseUser_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
