/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "users" (
    "userId" TEXT NOT NULL,
    "userFirstName" TEXT,
    "userLastName" TEXT,

    PRIMARY KEY ("userId")
);
