"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import ProtectedRoute from "@/components/ProtectedRoute";

interface HistoryItem {
  id: string;
  examTitle: string;
  date: string;
  score: number;
  timeSpent: number;
}

// Mock data
const MOCK_HISTORY: HistoryItem[] = [
  {
    id: "sub-1",
    examTitle: "Đề thi thử THPT Quốc Gia - Toán 2024",
    date: new Date(Date.now() - 86400000).toISOString(),
    score: 75.5,
    timeSpent: 245,
  },
  {
    id: "sub-2",
    examTitle: "Đề thi thử THPT Quốc Gia - Lý 2024",
    date: new Date(Date.now() - 172800000).toISOString(),
    score: 82.3,
    timeSpent: 180,
  },
  {
    id: "sub-3",
    examTitle: "Đề thi thử HSA - Tiếng Anh 2024",
    date: new Date(Date.now() - 259200000).toISOString(),
    score: 68.9,
    timeSpent: 120,
  },
];

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>(MOCK_HISTORY);
  const [stats, setStats] = useState({
    totalExams: MOCK_HISTORY.length,
    averageScore: 0,
  });

  useEffect(() => {
    // TODO: Fetch submission history from Supabase
    const avgScore =
      history.reduce((sum, item) => sum + item.score, 0) / history.length;
    setStats({
      totalExams: history.length,
      averageScore: avgScore,
    });
  }, [history]);

  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-syne text-gold mb-4">
            Lịch sử làm bài
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-navy/50 border border-gold/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-gold">
                {stats.totalExams}
              </div>
              <p className="text-gray-300 text-sm">Tổng số đề</p>
            </div>
            <div className="bg-navy/50 border border-gold/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-gold">
                {stats.averageScore.toFixed(1)}%
              </div>
              <p className="text-gray-300 text-sm">Điểm trung bình</p>
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-3">
          {history.length > 0 ? (
            history.map((item) => (
              <Link key={item.id} href={`/result/${item.id}`}>
                <div className="bg-navy/50 border border-gold/20 rounded-lg p-6 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/20 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gold">
                      {item.examTitle}
                    </h3>
                    <span className="text-2xl font-bold text-gold">
                      {item.score.toFixed(1)}%
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-300">
                    <span>{formatDate(item.date)}</span>
                    <span>
                      ⏱️ {Math.floor(item.timeSpent / 60)}m {item.timeSpent % 60}s
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400">
              Bạn chưa làm bài thi nào
            </div>
          )}
        </div>

        {/* Back button */}
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
