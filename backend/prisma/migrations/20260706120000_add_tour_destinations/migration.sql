CREATE TABLE "tour_destination_junction" (
    "Tour_ID" INTEGER NOT NULL,
    "Destination_ID" INTEGER NOT NULL,

    CONSTRAINT "tour_destination_junction_pkey" PRIMARY KEY ("Tour_ID", "Destination_ID")
);

CREATE INDEX "tour_destination_junction_Destination_ID_idx"
ON "tour_destination_junction"("Destination_ID");

ALTER TABLE "tour_destination_junction"
ADD CONSTRAINT "tour_destination_junction_Tour_ID_fkey"
FOREIGN KEY ("Tour_ID") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "tour_destination_junction"
ADD CONSTRAINT "tour_destination_junction_Destination_ID_fkey"
FOREIGN KEY ("Destination_ID") REFERENCES "destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "tour_destination_junction" ("Tour_ID", "Destination_ID")
SELECT "id", "Destination_ID"
FROM "tours"
WHERE "Destination_ID" IS NOT NULL
ON CONFLICT DO NOTHING;
