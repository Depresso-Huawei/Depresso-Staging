/*
  # Depresso Mental Health Application - Database Schema

  ## Overview
  This migration creates the complete database schema for Depresso, an AI-powered mental health application.
  It establishes tables for user profiles, mood tracking, journal entries, mental health resources, and user sessions.

  ## New Tables

  ### 1. `profiles`
  Extended user profile information linked to Supabase auth.users
  - `id` (uuid, primary key) - Links to auth.users
  - `email` (text) - User email
  - `full_name` (text) - User's full name
  - `avatar_url` (text) - Profile picture URL
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `preferences` (jsonb) - User preferences (theme, notifications, etc.)

  ### 2. `mood_logs`
  Daily mood tracking entries
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, foreign key) - References profiles.id
  - `mood_score` (integer) - Mood rating (1-10 scale)
  - `mood_type` (text) - Mood category (happy, sad, anxious, calm, etc.)
  - `energy_level` (integer) - Energy rating (1-10 scale)
  - `notes` (text) - Optional user notes
  - `created_at` (timestamptz) - Log creation timestamp
  - `tags` (text array) - Activity/trigger tags

  ### 3. `journal_entries`
  Private journaling for self-reflection
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, foreign key) - References profiles.id
  - `title` (text) - Entry title
  - `content` (text) - Journal entry content
  - `created_at` (timestamptz) - Entry creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `is_favorite` (boolean) - Marked as favorite

  ### 4. `mental_health_resources`
  Curated mental health resources and articles
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Resource title
  - `description` (text) - Resource description
  - `category` (text) - Resource category (meditation, therapy, crisis, etc.)
  - `url` (text) - External resource link
  - `created_at` (timestamptz) - Creation timestamp
  - `is_active` (boolean) - Resource availability status

  ### 5. `user_goals`
  User-defined mental health goals and progress tracking
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, foreign key) - References profiles.id
  - `goal_text` (text) - Goal description
  - `target_date` (date) - Goal deadline
  - `completed` (boolean) - Completion status
  - `created_at` (timestamptz) - Goal creation timestamp
  - `completed_at` (timestamptz) - Completion timestamp

  ## Security

  ### Row Level Security (RLS)
  All tables have RLS enabled with restrictive policies:

  1. **profiles** - Users can only view and update their own profile
  2. **mood_logs** - Users can only manage their own mood logs
  3. **journal_entries** - Users can only manage their own journal entries
  4. **mental_health_resources** - Public read access, admin write access
  5. **user_goals** - Users can only manage their own goals

  ### Key Security Features
  - All user data is protected by user_id ownership checks
  - Authentication required for all personal data access
  - Public resources table for helpful content
  - Automatic timestamp tracking for audit trails

  ## Important Notes
  1. All personal tables use `user_id` foreign keys with CASCADE delete to maintain data integrity
  2. Default values are set for timestamps and boolean fields
  3. Indexes are created on foreign keys for query performance
  4. All policies check `auth.uid()` to ensure users only access their own data
*/

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  preferences jsonb DEFAULT '{}'::jsonb
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create mood_logs table
CREATE TABLE IF NOT EXISTS mood_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  mood_score integer NOT NULL CHECK (mood_score >= 1 AND mood_score <= 10),
  mood_type text NOT NULL,
  energy_level integer CHECK (energy_level >= 1 AND energy_level <= 10),
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  tags text[] DEFAULT ARRAY[]::text[]
);

CREATE INDEX IF NOT EXISTS mood_logs_user_id_idx ON mood_logs(user_id);
CREATE INDEX IF NOT EXISTS mood_logs_created_at_idx ON mood_logs(created_at DESC);

ALTER TABLE mood_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own mood logs"
  ON mood_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mood logs"
  ON mood_logs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mood logs"
  ON mood_logs FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own mood logs"
  ON mood_logs FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create journal_entries table
CREATE TABLE IF NOT EXISTS journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text DEFAULT '',
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_favorite boolean DEFAULT false
);

CREATE INDEX IF NOT EXISTS journal_entries_user_id_idx ON journal_entries(user_id);
CREATE INDEX IF NOT EXISTS journal_entries_created_at_idx ON journal_entries(created_at DESC);

ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own journal entries"
  ON journal_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own journal entries"
  ON journal_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journal entries"
  ON journal_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own journal entries"
  ON journal_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create mental_health_resources table (public resources)
CREATE TABLE IF NOT EXISTS mental_health_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  url text,
  created_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

CREATE INDEX IF NOT EXISTS mental_health_resources_category_idx ON mental_health_resources(category);

ALTER TABLE mental_health_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active resources"
  ON mental_health_resources FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Create user_goals table
CREATE TABLE IF NOT EXISTS user_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  goal_text text NOT NULL,
  target_date date,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

CREATE INDEX IF NOT EXISTS user_goals_user_id_idx ON user_goals(user_id);
CREATE INDEX IF NOT EXISTS user_goals_completed_idx ON user_goals(completed);

ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own goals"
  ON user_goals FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals"
  ON user_goals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals"
  ON user_goals FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals"
  ON user_goals FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert some default mental health resources
INSERT INTO mental_health_resources (title, description, category, url) VALUES
  ('National Suicide Prevention Lifeline', 'Free, 24/7 support for people in distress and prevention and crisis resources.', 'crisis', 'tel:988'),
  ('Crisis Text Line', 'Free, 24/7 crisis support via text message. Text HOME to 741741.', 'crisis', 'sms:741741'),
  ('SAMHSA National Helpline', 'Free, confidential, 24/7 treatment referral and information service.', 'crisis', 'tel:1-800-662-4357'),
  ('Guided Meditation for Beginners', 'Learn basic meditation techniques to reduce stress and anxiety.', 'meditation', 'https://www.headspace.com/meditation/meditation-for-beginners'),
  ('Breathing Exercises', 'Simple breathing techniques to calm anxiety and reduce stress.', 'meditation', 'https://www.healthline.com/health/breathing-exercises-for-anxiety'),
  ('Understanding Depression', 'Comprehensive guide to recognizing and managing depression.', 'therapy', 'https://www.nimh.nih.gov/health/topics/depression'),
  ('Anxiety Management Techniques', 'Evidence-based strategies for managing anxiety symptoms.', 'therapy', 'https://www.apa.org/topics/anxiety')
ON CONFLICT DO NOTHING;