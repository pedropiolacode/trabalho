/*
  Warnings:

  - You are about to drop the column `avaliable` on the `Book` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Book" ("autor", "id", "title") SELECT "autor", "id", "title" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
