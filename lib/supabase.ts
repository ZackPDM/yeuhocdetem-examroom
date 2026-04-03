import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface ExamSet {
  id: string;
  title: string;
  subject: string;
  year: number;
  duration: number;
  total_questions: number;
  questions: Question[];
  created_at: string;
}

export interface Question {
  order: number;
  content: string;
  image: string | null;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: string;
  solution: string;
}

export interface Submission {
  id: string;
  user_id: string;
  exam_set_id: string;
  answers: Record<number, string>;
  score: number;
  time_spent: number;
  submitted_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}
