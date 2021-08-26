/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "posts.user_id_unique" ON "posts"("user_id");

-- AddForeignKey
ALTER TABLE "posts" ADD FOREIGN KEY ("user_id") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
