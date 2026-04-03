"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import QuestionRenderer from "@/components/QuestionRenderer";
import { ExamSet, Question } from "@/lib/supabase";
import toast from "react-hot-toast";

// Mock exam data
const MOCK_EXAM: ExamSet = {
  id: "exam-1",
  title: "Đề thi thử THPT Quốc Gia - Toán 2024",
  subject: "Toán",
  year: 2024,
  duration: 180,
  total_questions: 3,
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
    },
  ],
  created_at: new Date().toISOString(),
};

export default function ExamPage() {
  const params = useParams();
  const examId = params.id as string;

  const [exam, setExam] = useState<ExamSet | null>(MOCK_EXAM);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(MOCK_EXAM.duration * 60);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Timer
  useEffect(() => {
    if (!exam || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [exam, submitted]);

  const currentQuestion = exam?.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / (exam?.total_questions || 1)) * 100;

  const handleSelectAnswer = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex + 1]: option,
    }));
  };

  const handleSubmit = async () => {
    const unanswered = MOCK_EXAM.questions.filter(
      (q) => !answers[q.order]
    ).length;

    if (unanswered > 0) {
      const confirmed = window.confirm(
        `Bạn còn ${unanswered} câu chưa làm. Xác nhận nộp bài?`
      );
      if (!confirmed) return;
    }

    setLoading(true);
    setSubmitted(true);

    // TODO: Submit to Supabase
    toast.success("Nộp bài thành công!");

    // Redirect to result page
    setTimeout(() => {
      window.location.href = `/result/mock-submission-id`;
    }, 1000);
  };

  if (!exam) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gold">Đang tải...</div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const isWarning = timeLeft < 300; // Warning if less than 5 minutes

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-syne text-gold mb-2">
          {exam.title}
        </h1>
        <div className="flex justify-between items-center">
          <p className="text-gray-300">
            Câu {currentQuestionIndex + 1}/{exam.total_questions}
          </p>
          <div
            className={`text-2xl font-bold ${
              isWarning ? "text-red-500" : "text-gold"
            }`}
          >
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 bg-navy/50 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gold h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content */}
        <div className="lg:col-span-3">
          {currentQuestion && (
            <div className="bg-navy/50 border border-gold/20 rounded-lg p-8">
              {/* Question content */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold font-syne mb-4 text-gold">
                  Câu {currentQuestion.order}
                </h2>
                <QuestionRenderer
                  content={currentQuestion.content}
                  image={currentQuestion.image}
                />
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {Object.entries(currentQuestion.options).map(([key, value]) => (
                  <label
                    key={key}
                    className="flex items-start p-4 border border-gold/20 rounded cursor-pointer hover:bg-gold/10 transition-colors"
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={key}
                      checked={answers[currentQuestion.order] === key}
                      onChange={() => handleSelectAnswer(key)}
                      className="mt-1 mr-4"
                    />
                    <div className="w-full">
                      <span className="font-semibold text-gold mr-4">{key}.</span>
                      <span className="inline-block">
                        <QuestionRenderer content={value} isCompact={true} />
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between gap-4">
                <button
                  onClick={() =>
                    setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))
                  }
                  disabled={currentQuestionIndex === 0}
                  className="px-6 py-2 bg-navy/50 border border-gold/50 rounded hover:bg-navy hover:border-gold disabled:opacity-50 transition-colors"
                >
                  ← Câu trước
                </button>

                <button
                  onClick={() =>
                    setCurrentQuestionIndex(
                      Math.min(
                        exam.total_questions - 1,
                        currentQuestionIndex + 1
                      )
                    )
                  }
                  disabled={currentQuestionIndex === exam.total_questions - 1}
                  className="px-6 py-2 bg-navy/50 border border-gold/50 rounded hover:bg-navy hover:border-gold disabled:opacity-50 transition-colors"
                >
                  Câu tiếp →
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-8 py-2 bg-gold text-navy font-semibold rounded hover:bg-yellow-500 disabled:opacity-50 transition-colors ml-auto"
                >
                  {loading ? "Đang nộp..." : "Nộp bài"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Question list sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-navy/50 border border-gold/20 rounded-lg p-4 sticky top-32">
            <h3 className="font-semibold text-gold mb-4">Danh sách câu</h3>
            <div className="grid grid-cols-5 gap-2">
              {exam.questions.map((q, idx) => (
                <button
                  key={q.order}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`aspect-square rounded text-sm font-semibold transition-colors ${
                    currentQuestionIndex === idx
                      ? "bg-gold text-navy"
                      : answers[q.order]
                      ? "bg-green-600/50 text-white hover:bg-green-600/70"
                      : "bg-navy/50 border border-gold/20 text-white hover:border-gold/50"
                  }`}
                >
                  {q.order}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
