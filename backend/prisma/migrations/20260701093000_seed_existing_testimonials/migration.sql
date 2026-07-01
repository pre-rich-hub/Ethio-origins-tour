-- Move the testimonials previously embedded in the homepage into the database.
-- The existence check keeps this migration safe when a matching record was
-- already imported from the original website.
INSERT INTO "testimonials" ("message", "reviewer_name", "profession")
SELECT seed."message", seed."reviewer_name", seed."profession"
FROM (
    VALUES
        (
            'The most profound trip of my life. Every detail was flawless, and our guide felt like family by the end.',
            'Eleanor Whitfield',
            'United Kingdom · Historic Northern Route'
        ),
        (
            'Ethio Origins gave us access and stories no other operator could. The Omo Valley left us speechless.',
            'Marcus Lindqvist',
            'Sweden · Omo Valley Discovery'
        ),
        (
            'From the Simien sunrises to the coffee ceremonies, it was cinematic, authentic, and deeply moving.',
            'Aisha Rahman',
            'United Arab Emirates · Simien Mountains Expedition'
        )
) AS seed("message", "reviewer_name", "profession")
WHERE NOT EXISTS (
    SELECT 1
    FROM "testimonials" AS existing
    WHERE existing."reviewer_name" = seed."reviewer_name"
      AND existing."message" = seed."message"
);
