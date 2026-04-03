import { supabase } from "./supabase";

export const examService = {
  // Fetch all exams
  async getAllExams() {
    const { data, error } = await supabase
      .from("exam_sets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // Fetch exam by ID
  async getExamById(id: string) {
    const { data, error } = await supabase
      .from("exam_sets")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  // Fetch exams by subject and year
  async filterExams(subject?: string, year?: number) {
    let query = supabase.from("exam_sets").select("*");

    if (subject) query = query.eq("subject", subject);
    if (year) query = query.eq("year", year);

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) throw error;
    return data;
  },

  // Create exam (admin only)
  async createExam(examData: any) {
    const { data, error } = await supabase
      .from("exam_sets")
      .insert([examData])
      .select();

    if (error) throw error;
    return data[0];
  },

  // Update exam (admin only)
  async updateExam(id: string, updates: any) {
    const { data, error } = await supabase
      .from("exam_sets")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  // Delete exam (admin only)
  async deleteExam(id: string) {
    const { error } = await supabase
      .from("exam_sets")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};

export const submissionService = {
  // Submit answers
  async submitExam(userId: string, examSetId: string, answers: any, score: number, timeSpent: number) {
    const { data, error } = await supabase
      .from("submissions")
      .insert([
        {
          user_id: userId,
          exam_set_id: examSetId,
          answers,
          score,
          time_spent: timeSpent,
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  },

  // Check if user already submitted
  async hasSubmitted(userId: string, examSetId: string) {
    const { data, error } = await supabase
      .from("submissions")
      .select("id")
      .eq("user_id", userId)
      .eq("exam_set_id", examSetId)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return !!data;
  },

  // Get user submissions
  async getUserSubmissions(userId: string) {
    const { data, error } = await supabase
      .from("submissions")
      .select("id, exam_set_id, score, time_spent, submitted_at, exam_sets(title)")
      .eq("user_id", userId)
      .order("submitted_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get specific submission
  async getSubmission(submissionId: string) {
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("id", submissionId)
      .single();

    if (error) throw error;
    return data;
  },
};

export const storageService = {
  // Upload image
  async uploadImage(file: File, path: string) {
    const { data, error } = await supabase.storage
      .from("exam-images")
      .upload(path, file);

    if (error) throw error;
    return data;
  },

  // Get public image URL
  getImageUrl(path: string) {
    const { data } = supabase.storage
      .from("exam-images")
      .getPublicUrl(path);

    return data.publicUrl;
  },

  // Delete image
  async deleteImage(path: string) {
    const { error } = await supabase.storage
      .from("exam-images")
      .remove([path]);

    if (error) throw error;
  },
};
