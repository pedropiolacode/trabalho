/*
  Warnings:

  - You are about to drop the `Books` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Books";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "avaliable" BOOLEAN NOT NULL DEFAULT true
);
