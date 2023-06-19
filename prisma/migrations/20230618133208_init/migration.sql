-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL,
    "taskStatus" TEXT NOT NULL DEFAULT 'do zrobienia',
    "deadLineDate" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_title_key" ON "Task"("title");
