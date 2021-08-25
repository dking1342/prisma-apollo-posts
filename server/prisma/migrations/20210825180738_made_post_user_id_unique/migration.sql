/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "posts.user_id_unique" ON "posts"("user_id");
