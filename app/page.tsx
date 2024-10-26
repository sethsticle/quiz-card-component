"use client";

import { useState } from "react";
import { QuizCard } from "@/components/QuizCard";
import { QuizResults } from "@/components/QuizResults";
import questions from "@/data/questions.json";
import type { QuizState } from "@/types/quiz";

export default function Home() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    answers: [],
  });

  const handleAnswer = (isCorrect: boolean, userAnswer: number) => {
    setQuizState((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      answers: [
        ...prev.answers,
        {
          questionId: questions.questions[prev.currentQuestion].id,
          correct: isCorrect,
          userAnswer,
        },
      ],
    }));
  };

  const handleNext = () => {
    setQuizState((prev) => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
    }));
  };

  const isQuizComplete = quizState.currentQuestion >= questions.questions.length;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="transition-opacity duration-500">
        {!isQuizComplete ? (
          <QuizCard
            key={quizState.currentQuestion}
            question={questions.questions[quizState.currentQuestion]}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        ) : (
          <QuizResults results={quizState} />
        )}
      </div>
    </main>
  );
}