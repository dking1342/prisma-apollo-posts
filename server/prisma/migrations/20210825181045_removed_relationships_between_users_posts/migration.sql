/*
  Warnings:

  - You are about to drop the column `user_id` on the `posts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_fkey";

-- DropIndex
DROP INDEX "posts.user_id_unique";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "user_id";
