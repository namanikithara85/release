/*
# Create user profiles, guide applications, and agency enquiries tables

## Purpose
Extends Release Tours from a single enquiry form into a three-path platform
(travellers, guides, travel agencies) with social-login accounts. Each signed-in
user gets a profile that records which path they chose. Submissions for each
path are stored in dedicated tables and are only visible to the user who owns
them.

## New Tables
- `profiles`
  - `id`            uuid, primary key — references auth.users (one row per user)
  - `role`          text, not null — 'traveller' | 'guide' | 'agency' | null (until chosen)
  - `full_name`     text, nullable — populated from OAuth provider
  - `avatar_url`    text, nullable — populated from OAuth provider
  - `created_at`    timestamptz, default now()
- `guide_applications`
  - `id`            uuid, primary key
  - `user_id`       uuid, not null — defaults to auth.uid(), references auth.users
  - `full_name`     text, not null
  - `email`         text, not null
  - `region`        text, not null — region of Sri Lanka
  - `specialties`   text[], nullable — culture, movement, nature, craft, food, community
  - `languages`     text, nullable — languages spoken (free text)
  - `experience_years` text, nullable — years of experience (free text)
  - `statement`     text, nullable — short personal statement
  - `consent`       boolean, not null — consent to be contacted
  - `status`        text, not null default 'submitted' — submitted | reviewing | welcomed | not_a_match
  - `created_at`    timestamptz, default now()
  - `updated_at`    timestamptz, default now()
- `agency_enquiries`
  - `id`            uuid, primary key
  - `user_id`       uuid, not null — defaults to auth.uid(), references auth.users
  - `agency_name`   text, not null
  - `contact_name`  text, not null
  - `email`         text, not null
  - `country`       text, not null
  - `client_volume` text, nullable — typical clients sent per year (free text)
  - `communication` text, nullable — preferred communication method
  - `message`       text, nullable
  - `consent`       boolean, not null — consent to be contacted
  - `status`        text, not null default 'new' — new | reviewing | responded | partnered
  - `created_at`    timestamptz, default now()
  - `updated_at`    timestamptz, default now()

## Modified Tables
- `enquiries` — adds `user_id uuid` (nullable, references auth.users) and
  `enquirer_type text NOT NULL DEFAULT 'traveller'` so logged-in users can
  link their enquiries and the system tracks who submitted. The column is
  nullable so existing no-login submissions still work.

## Security
- `profiles`: RLS enabled. Authenticated users can SELECT and UPDATE only
  their own row. A trigger creates a profile automatically on sign-up.
- `guide_applications`: RLS enabled. Authenticated users can INSERT and
  SELECT only their own rows. No public/anon access — requires sign-in.
- `agency_enquiries`: RLS enabled. Same pattern as guide_applications.
- `enquiries`: existing INSERT policy extended to accept the new nullable
  user_id column; a SELECT policy added so authenticated users can read
  only their own enquiries (matched on user_id when non-null, or on email
  when user_id is null for legacy submissions). Public INSERT still allowed.

## Important notes
1. A trigger `handle_new_user` fires on auth.users INSERT to auto-create a
   profile row with the name and avatar from the OAuth provider metadata.
2. `user_id` columns default to `auth.uid()` so frontend inserts that omit
   user_id still satisfy RLS WITH CHECK.
3. The enquiries table gains a SELECT policy for authenticated users so
   travellers can see their own past enquiries in their dashboard.
4. Indexes on user_id columns support dashboard queries.
5. All policies use auth.uid() — never current_user.
*/

-- ============================================================
-- PROFILES
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text CHECK (role IN ('traveller', 'guide', 'agency')),
  full_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

GRANT SELECT, UPDATE ON profiles TO authenticated;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile"
  ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile"
  ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ============================================================
-- Auto-create profile on sign-up
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'user_metadata'->>'full_name',
      NEW.email
    ),
    COALESCE(
      NEW.raw_user_meta_data->>'avatar_url',
      NEW.raw_user_meta_data->>'picture',
      NEW.raw_user_meta_data->>'user_metadata'->>'avatar_url',
      NULL
    )
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- GUIDE APPLICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS guide_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  region text NOT NULL,
  specialties text[],
  languages text,
  experience_years text,
  statement text,
  consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'submitted',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE guide_applications ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON guide_applications TO authenticated;

DROP POLICY IF EXISTS "select_own_guide_applications" ON guide_applications;
CREATE POLICY "select_own_guide_applications"
  ON guide_applications FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_guide_applications" ON guide_applications;
CREATE POLICY "insert_own_guide_applications"
  ON guide_applications FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS guide_applications_user_id_idx ON guide_applications (user_id);

-- ============================================================
-- AGENCY ENQUIRIES
-- ============================================================
CREATE TABLE IF NOT EXISTS agency_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  agency_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  country text NOT NULL,
  client_volume text,
  communication text,
  message text,
  consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE agency_enquiries ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON agency_enquiries TO authenticated;

DROP POLICY IF EXISTS "select_own_agency_enquiries" ON agency_enquiries;
CREATE POLICY "select_own_agency_enquiries"
  ON agency_enquiries FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_agency_enquiries" ON agency_enquiries;
CREATE POLICY "insert_own_agency_enquiries"
  ON agency_enquiries FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS agency_enquiries_user_id_idx ON agency_enquiries (user_id);

-- ============================================================
-- EXTEND EXISTING ENQUIRIES TABLE
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_name = 'enquiries' AND column_name = 'user_id') THEN
    ALTER TABLE enquiries ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_name = 'enquiries' AND column_name = 'enquirer_type') THEN
    ALTER TABLE enquiries ADD COLUMN enquirer_type text NOT NULL DEFAULT 'traveller';
  END IF;
END $$;

-- Grant SELECT to authenticated so logged-in travellers can see their own enquiries
GRANT SELECT ON enquiries TO authenticated;

-- Drop and recreate the insert policy to allow the new columns
-- (The original policy checked only the required fields; we keep that check
-- and the public insert access so no-login enquiries still work.)
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

-- Authenticated users can SELECT only their own enquiries (by user_id, or
-- by matching email for legacy submissions made before login existed)
DROP POLICY IF EXISTS "select_own_enquiries" ON enquiries;
CREATE POLICY "select_own_enquiries"
  ON enquiries FOR SELECT
  TO authenticated USING (
    (user_id IS NOT NULL AND auth.uid() = user_id)
    OR (user_id IS NULL AND email IS NOT NULL AND email = (
      SELECT auth.users.email FROM auth.users WHERE auth.users.id = auth.uid()
    ))
  );

CREATE INDEX IF NOT EXISTS enquiries_user_id_idx ON enquiries (user_id) WHERE user_id IS NOT NULL;