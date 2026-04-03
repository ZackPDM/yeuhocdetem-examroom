"use client";

import { useState, useEffect } from "react";
import ExamCard from "@/components/ExamCard";
import { ExamSet } from "@/lib/supabase";

// Mock data - replace with real data from Supabase
const MOCK_EXAMS: ExamSet[] = [
  {
    id: "exam-1",
    title: "Đề thi thử THPT Quốc Gia - Toán 2024",
    subject: "Toán",
    year: 2024,
    duration: 180,
    total_questions: 50,
    questions: [
      {
        order: 1,
        content:
          "Giải phương trình: $x^2 - 5x + 6 = 0$",
        image: null,
        options: {
          A: "$x = 2, x = 3$",
          B: "$x = 1, x = 6$",
          C: "$x = -2, x = -3$",
          D: "$x = 0, x = 5$",
        },
        answer: "A",
        solution: "Phân tích: $(x-2)(x-3) = 0$, nên $x = 2$ hoặc $x = 3$",
      },
    ],
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
  {
    id: "exam-3",
    title: "Đề thi thử HSA - Tiếng Anh 2024",
    subject: "Tiếng Anh",
    year: 2024,
    duration: 120,
    total_questions: 30,
    questions: [],
    created_at: new Date().toISOString(),
  },
];

export default function Home() {
  const [exams, setExams] = useState<ExamSet[]>(MOCK_EXAMS);
  const [filteredExams, setFilteredExams] = useState<ExamSet[]>(MOCK_EXAMS);
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  useEffect(() => {
    // TODO: Fetch exams from Supabase
  }, []);

  useEffect(() => {
    let filtered = exams;

    if (selectedSubject !== "all") {
      filtered = filtered.filter((e) => e.subject === selectedSubject);
    }

    if (selectedYear !== "all") {
      filtered = filtered.filter((e) => e.year === parseInt(selectedYear));
    }

    setFilteredExams(filtered);
  }, [selectedSubject, selectedYear, exams]);

  const subjects = [...new Set(exams.map((e) => e.subject))];
  const years = [...new Set(exams.map((e) => e.year))].sort((a, b) => b - a);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-syne text-gold mb-4">
          Luyện Thi Online
        </h1>
        <p className="text-gray-300">
          Chọn bộ đề phù hợp để bắt đầu luyện thi
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex gap-4 flex-wrap">
        <div>
          <label className="text-sm text-gray-400">Môn học</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="mt-2 px-4 py-2 bg-navy/50 border border-gold/20 rounded text-white hover:border-gold/50 transition-colors"
          >
            <option value="all">Tất cả môn</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-400">Năm</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="mt-2 px-4 py-2 bg-navy/50 border border-gold/20 rounded text-white hover:border-gold/50 transition-colors"
          >
            <option value="all">Tất cả năm</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Exam List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.length > 0 ? (
          filteredExams.map((exam) => <ExamCard key={exam.id} exam={exam} />)
        ) : (
          <div className="col-span-full text-center py-12 text-gray-400">
            Không tìm thấy bộ đề nào
          </div>
        )}
      </div>
    </div>
  );
}
