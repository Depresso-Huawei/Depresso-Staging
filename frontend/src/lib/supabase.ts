import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          full_name: string | null;
          date_of_birth: string | null;
          timezone: string;
          avatar_url: string | null;
          onboarding_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          date_of_birth?: string | null;
          timezone?: string;
          avatar_url?: string | null;
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          date_of_birth?: string | null;
          timezone?: string;
          avatar_url?: string | null;
          onboarding_completed?: boolean;
          updated_at?: string;
        };
      };
      questionnaire_responses: {
        Row: {
          id: string;
          user_id: string;
          step_number: number;
          question_key: string;
          response_value: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          step_number: number;
          question_key: string;
          response_value: any;
          created_at?: string;
        };
        Update: {
          response_value?: any;
        };
      };
      mood_entries: {
        Row: {
          id: string;
          user_id: string;
          mood_score: number;
          energy_level: number;
          stress_level: number;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          mood_score: number;
          energy_level: number;
          stress_level: number;
          notes?: string | null;
          created_at?: string;
        };
      };
      crisis_resources: {
        Row: {
          id: string;
          title: string;
          description: string;
          phone_number: string | null;
          website_url: string | null;
          available_247: boolean;
          country_code: string;
          is_active: boolean;
          created_at: string;
        };
      };
    };
  };
};
