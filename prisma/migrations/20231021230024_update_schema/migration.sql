/*
  Warnings:

  - Added the required column `title` to the `Credential` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Credential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Credential" ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;
