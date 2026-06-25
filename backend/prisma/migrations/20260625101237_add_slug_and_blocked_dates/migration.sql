-- CreateTable
CREATE TABLE "admin_table" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "profile_pic_url" TEXT,

    CONSTRAINT "admin_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tours" (
    "id" SERIAL NOT NULL,
    "Destination_ID" INTEGER,
    "slug" VARCHAR(255) NOT NULL,
    "tour_name" TEXT NOT NULL,
    "adult_price" DECIMAL(10,2),
    "child_price" DECIMAL(10,2),
    "discount" TEXT,
    "rating" DECIMAL(3,1),
    "no_of_rates" INTEGER,
    "is_featured" BOOLEAN DEFAULT false,
    "overview" TEXT,
    "included" TEXT,
    "excluded" TEXT,
    "itinerary" TEXT,
    "journey_map" TEXT,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destinations" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "destination_name" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,

    CONSTRAINT "destinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_category" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "tour_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_category_junction" (
    "Tour_ID" INTEGER NOT NULL,
    "Category_ID" INTEGER NOT NULL,

    CONSTRAINT "tour_category_junction_pkey" PRIMARY KEY ("Tour_ID","Category_ID")
);

-- CreateTable
CREATE TABLE "gallery" (
    "id" SERIAL NOT NULL,
    "Image_url" TEXT NOT NULL,
    "Tour_ID" INTEGER,

    CONSTRAINT "gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery_table" (
    "id" SERIAL NOT NULL,
    "Image_url" TEXT NOT NULL,

    CONSTRAINT "gallery_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "Tour_ID" INTEGER,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "chosen_date" DATE NOT NULL,
    "no_of_adults" INTEGER NOT NULL,
    "no_of_children" INTEGER NOT NULL,
    "status" TEXT DEFAULT 'Pending',
    "created_at" TIMESTAMP(3),

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog" (
    "id" SERIAL NOT NULL,
    "blog_title" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "reviewer_name" TEXT NOT NULL,
    "profession" TEXT,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_blocked_dates" (
    "id" SERIAL NOT NULL,
    "tourId" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "reason" TEXT,

    CONSTRAINT "tour_blocked_dates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_table_email_key" ON "admin_table"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tours_slug_key" ON "tours"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "destinations_slug_key" ON "destinations"("slug");

-- CreateIndex
CREATE INDEX "tour_blocked_dates_tourId_date_idx" ON "tour_blocked_dates"("tourId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "tour_blocked_dates_tourId_date_key" ON "tour_blocked_dates"("tourId", "date");

-- AddForeignKey
ALTER TABLE "tours" ADD CONSTRAINT "tours_Destination_ID_fkey" FOREIGN KEY ("Destination_ID") REFERENCES "destinations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_category_junction" ADD CONSTRAINT "tour_category_junction_Tour_ID_fkey" FOREIGN KEY ("Tour_ID") REFERENCES "tours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_category_junction" ADD CONSTRAINT "tour_category_junction_Category_ID_fkey" FOREIGN KEY ("Category_ID") REFERENCES "tour_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery" ADD CONSTRAINT "gallery_Tour_ID_fkey" FOREIGN KEY ("Tour_ID") REFERENCES "tours"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_Tour_ID_fkey" FOREIGN KEY ("Tour_ID") REFERENCES "tours"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_blocked_dates" ADD CONSTRAINT "tour_blocked_dates_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;
