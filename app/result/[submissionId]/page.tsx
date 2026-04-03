"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import QuestionRenderer from "@/components/QuestionRenderer";
import { Question } from "@/lib/supabase";
import { formatTime } from "@/lib/utils";

interface ReviewQuestion extends Question {
  userAnswer: string | null;
  isCorrect: boolean;
}

// Mock submission data
const MOCK_SUBMISSION = {
  id: "mock-submission-id",
  exam_title: "Đề thi thử THPT Quốc Gia - Toán 2024",
  score: 66.67,
  correct: 2,
  incorrect: 1,
  skipped: 0,
  timeSpent: 245,
  answers: {
    "1": "A",
    "2": "A",
    "3": "C",
  },
  questions: [
    {
      order: 1,
      content: "Giải phương trình: $x^2 - 5x + 6 = 0$",
      image: null,
      options: {
        A: "$x = 2, x = 3$",
        B: "$x = 1, x = 6$",
        C: "$x = -2, x = -3$",
        D: "$x = 0, x = 5$",
      },
      answer: "A",
      solution:
        "Phân tích: $(x-2)(x-3) = 0$, nên $x = 2$ hoặc $x = 3$",
      userAnswer: "A",
      isCorrect: true,
    },
    {
      order: 2,
      content: "Tính giá trị của $\\sin(\\frac{\\pi}{6})$",
      image: null,
      options: {
        A: "$\\frac{1}{2}$",
        B: "$\\frac{\\sqrt{2}}{2}$",
        C: "$\\frac{\\sqrt{3}}{2}$",
        D: "$1$",
      },
      answer: "A",
      solution: "Giá trị của $\\sin(\\frac{\\pi}{6}) = \\frac{1}{2}$",
      userAnswer: "A",
      isCorrect: true,
    },
    {
      order: 3,
      content: "Tính đạo hàm của $f(x) = x^3 + 2x^2 - 5x + 1$",
      image: null,
      options: {
        A: "$f'(x) = 3x^2 + 4x - 5$",
        B: "$f'(x) = 3x^2 + 2x - 5$",
        C: "$f'(x) = x^3 + 4x - 5$",
        D: "$f'(x) = 3x + 4$",
      },
      answer: "A",
      solution: "$f'(x) = 3x^2 + 4x - 5$",
      userAnswer: "C",
      isCorrect: false,
    },
  ] as ReviewQuestion[],
};

export default function ResultPage() {
  const params = useParams();
  const submissionId = params.submissionId as string;

  const [filter, setFilter] = useState<"all" | "correct" | "wrong" | "skipped">(
    "all"
  );
  const [submission, setSubmission] = useState(MOCK_SUBMISSION);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(
    new Set()
  );

  const filteredQuestions = submission.questions.filter((q) => {
    if (filter === "all") return true;
    if (filter === "correct") return q.isCorrect;
    if (filter === "wrong") return !q.isCorrect && q.userAnswer;
    if (filter === "skipped") return !q.userAnswer;
    return true;
  });

  const toggleSolution = (questionOrder: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionOrder)) {
      newExpanded.delete(questionOrder);
    } else {
      newExpanded.add(questionOrder);
    }
    setExpandedQuestions(newExpanded);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-syne text-gold mb-2">
          Kết quả bài thi
        </h1>
        <p className="text-gray-300">{submission.exam_title}</p>
      </div>

      {/* Score Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-navy/50 border border-gold/20 rounded-lg p-6 text-center">
          <div className="text-5xl font-bold text-gold mb-2">
            {submission.score.toFixed(2)}%
          </div>
          <p className="text-gray-300">Tổng điểm</p>
        </div>

        <div className="bg-navy/50 border border-gold/20 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-500 mb-2">
            {submission.correct}
          </div>
          <p className="text-gray-300">🟢 Đúng</p>
        </div>

        <div className="bg-navy/50 border border-gold/20 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-red-500 mb-2">
            {submission.incorrect}
          </div>
          <p className="text-gray-300">🔴 Sai</p>
        </div>

        <div className="bg-navy/50 border border-gold/20 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-gray-300 mb-2">
            {submission.skipped}
          </div>
          <p className="text-gray-300">⚪ Bỏ</p>
        </div>
      </div>

      {/* Time */}
      <div className="mb-8 p-4 bg-navy/50 border border-gold/20 rounded-lg text-center">
        <p className="text-gray-300">
          Thời gian làm: <span className="text-gold font-semibold">{formatTime(submission.timeSpent)}</span>
        </p>
      </div>

      {/* Filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {(["all", "correct", "wrong", "skipped"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded transition-colors ${
              filter === f
                ? "bg-gold text-navy"
                : "bg-navy/50 border border-gold/20 text-gold hover:border-gold/50"
            }`}
          >
            {f === "all" && "Tất cả"}
            {f === "correct" && "✓ Câu đúng"}
            {f === "wrong" && "✗ Câu sai"}
            {f === "skipped" && "Câu bỏ"}
          </button>
        ))}
      </div>

      {/* Questions Review */}
      <div className="space-y-4 mb-8">
        {filteredQuestions.map((question) => (
          <div
            key={question.order}
            className={`border rounded-lg p-6 ${
              question.isCorrect
                ? "border-green-500/30 bg-green-500/5"
                : question.userAnswer
                ? "border-red-500/30 bg-red-500/5"
                : "border-gray-500/30 bg-gray-500/5"
            }`}
          >
            {/* Question Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold">
                  Câu {question.order}
                  <span className="ml-3">
                    {question.isCorrect && "✓ "}
                    {!question.isCorrect && question.userAnswer && "✗ "}
                    {!question.userAnswer && "○ "}
                  </span>
                </h3>
              </div>

              <QuestionRenderer
                content={question.content}
                image={question.image}
              />
            </div>

            {/* Options */}
            <div className="space-y-2 mb-4">
              {Object.entries(question.options).map(([key, value]) => {
                const isCorrectAnswer = key === question.answer;
                const isUserAnswer = key === question.userAnswer;

                return (
                  <div
                    key={key}
                    className={`p-3 rounded border-2 ${
                      isCorrectAnswer
                        ? "border-green-500 bg-green-500/10"
                        : isUserAnswer
                        ? "border-red-500 bg-red-500/10"
                        : "border-gray-500/30"
                    }`}
                  >
                    <span className="font-semibold">{key}.</span>{" "}
                    <span>
                      <QuestionRenderer content={value} isCompact={true} />
                    </span>
                    {isCorrectAnswer && (
                      <span className="ml-2 text-green-500">✓ Đáp án</span>
                    )}
                    {isUserAnswer && isCorrectAnswer && (
                      <span className="ml-2 text-green-500">Bạn trả lời</span>
                    )}
                    {isUserAnswer && !isCorrectAnswer && (
                      <span className="ml-2 text-red-500">Bạn trả lời</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Solution */}
            <button
              onClick={() => toggleSolution(question.order)}
              className="text-gold hover:text-yellow-500 font-semibold text-sm mb-2"
            >
              {expandedQuestions.has(question.order)
                ? "▼ Ẩn lời giải"
                : "▶ Xem lời giải"}
            </button>

            {expandedQuestions.has(question.order) && (
              <div className="mt-3 p-3 bg-navy/50 border border-gold/20 rounded">
                <p className="text-sm text-gray-300">
                  <QuestionRenderer content={question.solution} isCompact={true} />
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-center">
        <Link
          href="/"
          className="px-6 py-2 bg-navy/50 border border-gold/50 rounded hover:bg-navy hover:border-gold transition-colors"
        >
          ← Quay lại
        </Link>
        <Link
          href="/history"
          className="px-6 py-2 bg-gold text-navy font-semibold rounded hover:bg-yellow-500 transition-colors"
        >
          Xem lịch sử
        </Link>
      </div>
    </div>
  );
}
