-- AlterTable: Add slug and categoryId to blog
ALTER TABLE "blog" ADD COLUMN     "slug" VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE "blog" ADD COLUMN     "categoryId" INTEGER;

-- CreateTable: blog_category
CREATE TABLE "blog_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    CONSTRAINT "blog_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blog_category_name_key" ON "blog_category"("name");
CREATE UNIQUE INDEX "blog_category_slug_key" ON "blog_category"("slug");
CREATE UNIQUE INDEX "blog_slug_key" ON "blog"("slug");

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "blog_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
