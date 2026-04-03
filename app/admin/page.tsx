"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ExamSet } from "@/lib/supabase";
import toast from "react-hot-toast";

// Mock exams
const MOCK_EXAMS: ExamSet[] = [
  {
    id: "exam-1",
    title: "Đề thi thử THPT Quốc Gia - Toán 2024",
    subject: "Toán",
    year: 2024,
    duration: 180,
    total_questions: 50,
    questions: [],
    created_at: new Date().toISOString(),
  },
  {
    id: "exam-2",
    title: "Đề thi thử THPT Quốc Gia - Lý 2024",
    subject: "Lý",
    year: 2024,
    duration: 180,
    total_questions: 40,
    questions: [],
    created_at: new Date().toISOString(),
  },
];

export default function AdminPage() {
  const [exams, setExams] = useState<ExamSet[]>(MOCK_EXAMS);

  useEffect(() => {
    // TODO: Fetch exams from Supabase
  }, []);

  const handleDelete = async (examId: string) => {
    if (!window.confirm("Xác nhận xóa đề thi này?")) return;

    try {
      // TODO: Delete from Supabase
      setExams(exams.filter((e) => e.id !== examId));
      toast.success("Xóa đề thi thành công");
    } catch (error) {
      toast.error("Xóa đề thi thất bại");
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold font-syne text-gold">
            Quản lý đề thi
          </h1>
          <Link
            href="/admin/create"
            className="px-6 py-2 bg-gold text-navy font-semibold rounded hover:bg-yellow-500 transition-colors"
          >
            + Tạo đề mới
          </Link>
        </div>

        {/* Exam List */}
        <div className="space-y-4">
          {exams.length > 0 ? (
            exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-navy/50 border border-gold/20 rounded-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gold mb-2">
                      {exam.title}
                    </h3>
                    <div className="text-sm text-gray-300 space-y-1">
                      <p>
                        <span className="text-gold">Môn:</span> {exam.subject}
                      </p>
                      <p>
                        <span className="text-gold">Năm:</span> {exam.year}
                      </p>
                      <p>
                        <span className="text-gold">Số câu:</span>{" "}
                        {exam.total_questions}
                      </p>
                      <p>
                        <span className="text-gold">Thời gian:</span>{" "}
                        {exam.duration} phút
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/admin/edit/${exam.id}`}
                      className="px-4 py-2 bg-navy/50 border border-gold/20 rounded hover:border-gold transition-colors"
                    >
                      Chỉnh sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(exam.id)}
                      className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400">
              Chưa có đề thi nào
            </div>
          )}
        </div>

        {/* Back */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-navy/50 border border-gold/50 rounded hover:bg-navy hover:border-gold transition-colors"
          >
            ← Quay lại
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
