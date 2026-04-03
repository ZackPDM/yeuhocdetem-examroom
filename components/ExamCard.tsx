"use client";

import Link from "next/link";
import { ExamSet } from "@/lib/supabase";

interface ExamCardProps {
  exam: ExamSet;
}

export default function ExamCard({ exam }: ExamCardProps) {
  return (
    <Link href={`/exam/${exam.id}`}>
      <div className="bg-gradient-to-br from-navy to-navy/80 border border-gold/20 rounded-lg p-6 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/20 transition-all cursor-pointer">
        <h3 className="text-xl font-bold font-syne text-gold mb-2">
          {exam.title}
        </h3>

        <div className="space-y-2 text-sm text-gray-300">
          <p>
            <span className="text-gold">Môn:</span> {exam.subject}
          </p>
          <p>
            <span className="text-gold">Năm:</span> {exam.year}
          </p>
          <p>
            <span className="text-gold">Số câu:</span> {exam.total_questions}
          </p>
          <p>
            <span className="text-gold">Thời gian:</span> {exam.duration} phút
          </p>
        </div>

        <button className="mt-4 w-full bg-gold text-navy font-semibold py-2 rounded hover:bg-yellow-500 transition-colors">
          Làm bài thi
        </button>
      </div>
    </Link>
  );
}
