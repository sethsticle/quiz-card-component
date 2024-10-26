export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: { questionId: number; correct: boolean; userAnswer: number }[];
}