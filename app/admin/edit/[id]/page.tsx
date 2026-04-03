"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MathToolbar from "@/components/MathToolbar";
import QuestionRenderer from "@/components/QuestionRenderer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ExamSet, Question } from "@/lib/supabase";
import toast from "react-hot-toast";

// Mock data
const MOCK_EXAM: ExamSet = {
  id: "exam-1",
  title: "Đề thi thử THPT Quốc Gia - Toán 2024",
  subject: "Toán",
  year: 2024,
  duration: 180,
  total_questions: 2,
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
  ],
  created_at: new Date().toISOString(),
};

export default function EditExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id as string;

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [duration, setDuration] = useState(180);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // TODO: Fetch exam from Supabase
    setTitle(MOCK_EXAM.title);
    setSubject(MOCK_EXAM.subject);
    setYear(MOCK_EXAM.year);
    setDuration(MOCK_EXAM.duration);
    setQuestions(MOCK_EXAM.questions);
    setLoading(false);
  }, [examId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gold">Đang tải...</div>
      </div>
    );
  }

  const emptyQuestion: Question = {
    order: questions.length + 1,
    content: "",
    image: null,
    options: { A: "", B: "", C: "", D: "" },
    answer: "A",
    solution: "",
  };

  const currentQuestion =
    selectedQuestionIdx !== null
      ? questions[selectedQuestionIdx]
      : emptyQuestion;

  const addQuestion = () => {
    const newQuestion: Question = {
      ...emptyQuestion,
      order: questions.length + 1,
    };
    setQuestions([...questions, newQuestion]);
    setSelectedQuestionIdx(questions.length);
  };

  const updateQuestion = (updates: Partial<Question>) => {
    if (selectedQuestionIdx === null) return;
    const updated = [...questions];
    updated[selectedQuestionIdx] = {
      ...updated[selectedQuestionIdx],
      ...updates,
    };
    setQuestions(updated);
  };

  const deleteQuestion = (idx: number) => {
    if (!window.confirm("Xóa câu hỏi này?")) return;
    const updated = questions.filter((_, i) => i !== idx);
    updated.forEach((q, i) => (q.order = i + 1));
    setQuestions(updated);
    setSelectedQuestionIdx(null);
  };

  const insertMathSymbol = (symbol: string) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = currentQuestion.content;
    const newText =
      text.substring(0, start) + symbol + text.substring(end);

    updateQuestion({ content: newText });

    setTimeout(() => {
      if (textarea) {
        textarea.selectionStart = textarea.selectionEnd =
          start + symbol.length;
        textarea.focus();
      }
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !subject) {
      toast.error("Vui lòng nhập tiêu đề và chọn môn học");
      return;
    }

    if (questions.length === 0) {
      toast.error("Vui lòng có ít nhất 1 câu hỏi");
      return;
    }

    setSaving(true);

    try {
      // TODO: Update in Supabase
      toast.success("Cập nhật đề thi thành công!");
      router.push("/admin");
    } catch (error) {
      toast.error("Cập nhật đề thi thất bại");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-syne text-gold mb-8">
          Chỉnh sửa đề thi
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-navy/50 border border-gold/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gold mb-4">
              Thông tin cơ bản
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tiêu đề đề thi
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-navy border border-gold/20 rounded focus:outline-none focus:border-gold transition-colors"
                  placeholder="Đề thi thử THPT Quốc Gia..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Môn học
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 bg-navy border border-gold/20 rounded focus:outline-none focus:border-gold transition-colors"
                  required
                >
                  <option value="">-- Chọn môn --</option>
                  <option value="Toán">Toán</option>
                  <option value="Lý">Lý</option>
                  <option value="Hóa">Hóa</option>
                  <option value="Sinh">Sinh</option>
                  <option value="Tiếng Anh">Tiếng Anh</option>
                  <option value="Tiếng Việt">Tiếng Việt</option>
                  <option value="Lịch Sử">Lịch Sử</option>
                  <option value="Địa Lý">Địa Lý</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Năm
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-navy border border-gold/20 rounded focus:outline-none focus:border-gold transition-colors"
                  min="2000"
                  max={new Date().getFullYear() + 1}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Thời gian làm bài (phút)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-navy border border-gold/20 rounded focus:outline-none focus:border-gold transition-colors"
                  min="1"
                  max="480"
                />
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="bg-navy/50 border border-gold/20 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gold">
                Câu hỏi ({questions.length})
              </h2>
              <button
                type="button"
                onClick={addQuestion}
                className="px-4 py-2 bg-gold text-navy font-semibold rounded hover:bg-yellow-500 transition-colors"
              >
                + Thêm câu
              </button>
            </div>

            {/* Question List */}
            {questions.length > 0 && (
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-6">
                {questions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedQuestionIdx(idx)}
                    className={`aspect-square rounded font-semibold transition-colors ${
                      selectedQuestionIdx === idx
                        ? "bg-gold text-navy"
                        : "bg-navy border border-gold/20 text-gold hover:border-gold/50"
                    }`}
                  >
                    {q.order}
                  </button>
                ))}
              </div>
            )}

            {selectedQuestionIdx !== null && (
              <div className="space-y-4">
                {/* Question Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nội dung câu hỏi (hỗ trợ LaTeX)
                  </label>
                  <MathToolbar onInsert={insertMathSymbol} />
                  <textarea
                    ref={contentRef}
                    value={currentQuestion.content}
                    onChange={(e) =>
                      updateQuestion({ content: e.target.value })
                    }
                    className="w-full h-24 px-4 py-2 bg-navy border border-gold/20 rounded focus:outline-none focus:border-gold transition-colors"
                    placeholder="Nhập nội dung câu hỏi..."
                  />
                  <div className="mt-2 p-3 bg-navy rounded border border-gold/20 text-sm">
                    <p className="text-gray-300 mb-1">Preview:</p>
                    <QuestionRenderer content={currentQuestion.content} />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL ảnh (tuỳ chọn)
                  </label>
                  <input
                    type="url"
                    value={currentQuestion.image || ""}
                    onChange={(e) =>
                      updateQuestion({ image: e.target.value || null })
                    }
                    className="w-full px-4 py-2 bg-navy border border-gold/20 rounded focus:outline-none focus:border-gold transition-colors"
                    placeholder="https://..."
                  />
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["A", "B", "C", "D"].map((key) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Đáp án {key}
                      </label>
                      <input
                        type="text"
                        value={currentQuestion.options[key as keyof typeof currentQuestion.options]}
                        onChange={(e) =>
                          updateQuestion({
                            options: {
                              ...currentQuestion.options,
                              [key]: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-2 bg-navy border border-gold/20 rounded focus:outline-none focus:border-gold transition-colors"
                        placeholder={`Đáp án ${key}...`}
                      />
                      {currentQuestion.options[key as keyof typeof currentQuestion.options] && (
                        <div className="mt-1 p-2 bg-navy/50 rounded border border-gold/20 text-xs">
                          <p className="text-gray-400 mb-1">Preview:</p>
                          <QuestionRenderer 
                            content={currentQuestion.options[key as keyof typeof currentQuestion.options]} 
                            isCompact={true}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Correct Answer */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Đáp án đúng
                  </label>
                  <div className="flex gap-4">
                    {["A", "B", "C", "D"].map((key) => (
                      <label key={key} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`answer-${selectedQuestionIdx}`}
                          value={key}
                          checked={currentQuestion.answer === key}
                          onChange={() =>
                            updateQuestion({ answer: key })
                          }
                          className="cursor-pointer"
                        />
                        <span>{key}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Solution */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Lời giải (hỗ trợ LaTeX)
                  </label>
                  <textarea
                    value={currentQuestion.solution}
                    onChange={(e) =>
                      updateQuestion({ solution: e.target.value })
                    }
                    className="w-full h-20 px-4 py-2 bg-navy border border-gold/20 rounded focus:outline-none focus:border-gold transition-colors"
                    placeholder="Nhập lời giải..."
                  />
                  {currentQuestion.solution && (
                    <div className="mt-2 p-3 bg-navy rounded border border-gold/20 text-sm">
                      <p className="text-gray-300 mb-1">Preview:</p>
                      <QuestionRenderer content={currentQuestion.solution} />
                    </div>
                  )}
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => deleteQuestion(selectedQuestionIdx)}
                  className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors"
                >
                  Xóa câu này
                </button>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-2 bg-gold text-navy font-semibold rounded hover:bg-yellow-500 disabled:opacity-50 transition-colors"
            >
              {saving ? "Đang lưu..." : "Cập nhật đề thi"}
            </button>
            <Link
              href="/admin"
              className="px-8 py-2 bg-navy/50 border border-gold/50 rounded hover:bg-navy hover:border-gold transition-colors"
            >
              Hủy
            </Link>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}
