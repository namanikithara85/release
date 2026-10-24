/*
# Create enquiries table for Release Tours

## Purpose
Stores enquiries submitted by international travellers interested in the
seven-day Release Tours experience. The public enquiry form inserts rows;
the business owner reads them through the Supabase dashboard or an
authenticated admin view (not part of this build).

## New Tables
- `enquiries`
  - `id`            uuid, primary key
  - `full_name`     text, not null — submitted name
  - `email`         text, not null — submitter email
  - `country`       text, not null — country of residence
  - `travel_dates`  text, nullable — preferred travel month/dates (free text)
  - `travellers`    text, nullable — number of travellers (free text, kept as string for flexibility)
  - `interests`     text[], nullable — selected areas of interest
  - `message`       text, nullable — additional questions or information
  - `consent`       boolean, not null — consent to be contacted
  - `status`        text, not null default 'new' — tracking state for the owner
  - `created_at`    timestamptz, default now()

## Security
- RLS enabled on `enquiries`.
- Public (anon + authenticated) can INSERT only — anyone visiting the site
  may submit an enquiry. No public SELECT/UPDATE/DELETE: only the owner
  (via dashboard / service_role) can read or manage enquiries.
- GRANT INSERT on `enquiries` TO anon, authenticated.
- INSERT policy checks that required fields are present and consent is true.
- An index on `created_at` supports the owner's chronological review.
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  country text NOT NULL,
  travel_dates text,
  travellers text,
  interests text[],
  message text,
  consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON enquiries TO anon, authenticated;

DROP POLICY IF EXISTS "public_insert_enquiries" ON enquiries;
CREATE POLICY "public_insert_enquiries"
  ON enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    full_name IS NOT NULL
    AND char_length(trim(full_name)) >= 2
    AND email IS NOT NULL
    AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND country IS NOT NULL
    AND consent = true
  );

CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);
