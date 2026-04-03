-- Create exam_sets table
CREATE TABLE exam_sets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject text NOT NULL,
  year int NOT NULL,
  duration int NOT NULL,
  total_questions int NOT NULL,
  questions jsonb NOT NULL,
  created_at timestamp DEFAULT now()
);

-- Create submissions table
CREATE TABLE submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_set_id uuid NOT NULL REFERENCES exam_sets(id) ON DELETE CASCADE,
  answers jsonb NOT NULL,
  score float NOT NULL,
  time_spent int NOT NULL,
  submitted_at timestamp DEFAULT now(),
  UNIQUE(user_id, exam_set_id)
);

-- Create indexes
CREATE INDEX idx_exam_sets_subject ON exam_sets(subject);
CREATE INDEX idx_exam_sets_year ON exam_sets(year);
CREATE INDEX idx_submissions_user_id ON submissions(user_id);
CREATE INDEX idx_submissions_exam_set_id ON submissions(exam_set_id);

-- Enable RLS
ALTER TABLE exam_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for exam_sets (public read)
CREATE POLICY "Everyone can read exam_sets"
  ON exam_sets FOR SELECT
  USING (true);

-- RLS Policies for submissions (user can only see their own)
CREATE POLICY "Users can read their own submissions"
  ON submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own submissions"
  ON submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Prevent duplicate submissions
CREATE POLICY "Prevent duplicate submissions"
  ON submissions FOR INSERT
  WITH CHECK (
    NOT EXISTS (
      SELECT 1 FROM submissions s
      WHERE s.user_id = auth.uid()
      AND s.exam_set_id = submissions.exam_set_id
    )
  );
