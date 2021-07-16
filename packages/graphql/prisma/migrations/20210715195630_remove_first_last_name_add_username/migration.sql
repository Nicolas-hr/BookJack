/*
  Warnings:

  - You are about to drop the column `userFirstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userLastName` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "userFirstName",
DROP COLUMN "userLastName",
ADD COLUMN     "userUsername" TEXT;
