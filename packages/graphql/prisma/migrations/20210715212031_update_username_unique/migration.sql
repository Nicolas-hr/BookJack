/*
  Warnings:

  - A unique constraint covering the columns `[userUsername]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users.userUsername_unique" ON "users"("userUsername");
