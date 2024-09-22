/*
  Warnings:

  - You are about to drop the column `name` on the `posts` table. All the data in the column will be lost.
  - Added the required column `context` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "name",
ADD COLUMN     "context" TEXT NOT NULL;
