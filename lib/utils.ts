export const calculateScore = (
  userAnswers: Record<number, string>,
  questions: any[]
): { score: number; correct: number; incorrect: number; skipped: number } => {
  let correct = 0;
  let incorrect = 0;
  let skipped = 0;

  questions.forEach((question: any) => {
    const userAnswer = userAnswers[question.order];

    if (!userAnswer) {
      skipped++;
    } else if (userAnswer === question.answer) {
      correct++;
    } else {
      incorrect++;
    }
  });

  const score = (correct / questions.length) * 100;

  return { score, correct, incorrect, skipped };
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  }
  return `${minutes}m ${secs}s`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
