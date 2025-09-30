-- CreateTable
CREATE TABLE "Books" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "avaliable" BOOLEAN NOT NULL DEFAULT true
);
