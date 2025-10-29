/*
  # Depresso Mental Health Platform - Database Schema

  ## Overview
  This migration sets up the complete database schema for the Depresso mental health platform,
  including user profiles, questionnaire responses, mood tracking, and crisis resources.

  ## Tables Created

  1. **user_profiles**
     - `id` (uuid, primary key) - Links to auth.users
     - `full_name` (text) - User's display name
     - `date_of_birth` (date) - For age-appropriate content
     - `timezone` (text) - User's timezone for scheduling
     - `avatar_url` (text) - Profile picture URL
     - `onboarding_completed` (boolean) - Tracks if user completed questionnaire
     - `created_at` (timestamptz) - Account creation timestamp
     - `updated_at` (timestamptz) - Last profile update

  2. **questionnaire_responses**
     - `id` (uuid, primary key) - Unique response ID
     - `user_id` (uuid, foreign key) - Links to user_profiles
     - `step_number` (integer) - Which step (1-5)
     - `question_key` (text) - Identifier for the question
     - `response_value` (jsonb) - Flexible storage for answers
     - `created_at` (timestamptz) - When response was recorded

  3. **mood_entries**
     - `id` (uuid, primary key) - Unique entry ID
     - `user_id` (uuid, foreign key) - Links to user_profiles
     - `mood_score` (integer) - 1-10 scale
     - `energy_level` (integer) - 1-10 scale
     - `stress_level` (integer) - 1-10 scale
     - `notes` (text) - Optional user notes
     - `created_at` (timestamptz) - Entry timestamp

  4. **crisis_resources**
     - `id` (uuid, primary key) - Resource ID
     - `title` (text) - Resource name
     - `description` (text) - What the resource offers
     - `phone_number` (text) - Contact phone
     - `website_url` (text) - Resource website
     - `available_247` (boolean) - 24/7 availability
     - `country_code` (text) - Country/region
     - `is_active` (boolean) - Whether to display

  ## Security
  - RLS enabled on all tables
  - Users can only access their own data
  - Crisis resources are publicly readable
  - Authenticated users required for all personal data
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  date_of_birth date,
  timezone text DEFAULT 'UTC',
  avatar_url text,
  onboarding_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create questionnaire_responses table
CREATE TABLE IF NOT EXISTS questionnaire_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  step_number integer NOT NULL,
  question_key text NOT NULL,
  response_value jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create mood_entries table
CREATE TABLE IF NOT EXISTS mood_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  mood_score integer CHECK (mood_score >= 1 AND mood_score <= 10),
  energy_level integer CHECK (energy_level >= 1 AND energy_level <= 10),
  stress_level integer CHECK (stress_level >= 1 AND stress_level <= 10),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create crisis_resources table
CREATE TABLE IF NOT EXISTS crisis_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  phone_number text,
  website_url text,
  available_247 boolean DEFAULT false,
  country_code text DEFAULT 'US',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_resources ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for questionnaire_responses
CREATE POLICY "Users can view own responses"
  ON questionnaire_responses FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own responses"
  ON questionnaire_responses FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own responses"
  ON questionnaire_responses FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for mood_entries
CREATE POLICY "Users can view own mood entries"
  ON mood_entries FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own mood entries"
  ON mood_entries FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own mood entries"
  ON mood_entries FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own mood entries"
  ON mood_entries FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for crisis_resources (public read access)
CREATE POLICY "Anyone can view active crisis resources"
  ON crisis_resources FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Insert default crisis resources
INSERT INTO crisis_resources (title, description, phone_number, website_url, available_247, country_code)
VALUES 
  ('988 Suicide & Crisis Lifeline', 'Free and confidential support for people in distress, 24/7', '988', 'https://988lifeline.org', true, 'US'),
  ('Crisis Text Line', 'Text HOME to 741741 to connect with a Crisis Counselor', '741741', 'https://www.crisistextline.org', true, 'US'),
  ('NAMI Helpline', 'National Alliance on Mental Illness information and support', '1-800-950-6264', 'https://www.nami.org', false, 'US')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_questionnaire_user_id ON questionnaire_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_entries_user_id ON mood_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_entries_created_at ON mood_entries(created_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for user_profiles
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();