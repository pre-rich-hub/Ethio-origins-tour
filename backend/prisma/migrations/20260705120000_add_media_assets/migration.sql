CREATE TABLE "media_assets" (
    "id" TEXT NOT NULL,
    "content" BYTEA NOT NULL,
    "mime_type" TEXT NOT NULL,
    "original_name" TEXT,
    "size" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_assets_pkey" PRIMARY KEY ("id")
);
