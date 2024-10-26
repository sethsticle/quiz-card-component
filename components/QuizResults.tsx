import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import type { QuizState } from "@/types/quiz";
import questions from "@/data/questions.json";

interface QuizResultsProps {
  results: QuizState;
}

export function QuizResults({ results }: QuizResultsProps) {
  return (
    <Card className="p-6 w-[800px]">
      <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
      <p className="text-xl mb-6">
        Final Score: {results.score} out of {questions.questions.length}
      </p>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Your Answer</TableHead>
            <TableHead>Correct Answer</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.answers.map((answer) => {
            const question = questions.questions.find(q => q.id === answer.questionId)!;
            return (
              <TableRow key={answer.questionId}>
                <TableCell className="font-medium">{question.question}</TableCell>
                <TableCell>{question.options[answer.userAnswer]}</TableCell>
                <TableCell>{question.options[question.correctAnswer]}</TableCell>
                <TableCell>
                  <span className={answer.correct ? "text-green-600" : "text-red-600"}>
                    {answer.correct ? "Correct" : "Incorrect"}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}