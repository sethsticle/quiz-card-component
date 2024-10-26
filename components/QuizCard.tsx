"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Question } from "@/types/quiz";

interface QuizCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean, userAnswer: number) => void;
  onNext: () => void;
}

export function QuizCard({ question, onAnswer, onNext }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setHasAnswered(true);
    onAnswer(selectedAnswer === question.correctAnswer, selectedAnswer);
  };

  const handleNext = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setSelectedAnswer(null);
      setHasAnswered(false);
      onNext();
      setIsFlipping(false);
    }, 300);
  };

  return (
    <div className={cn(
      "transition-transform duration-300 perspective-1000",
      isFlipping && "rotate-y-90"
    )}>
      <Card className="p-6 w-[500px] min-h-[400px] flex flex-col">
        <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
        
        <RadioGroup
          className="space-y-4 flex-grow"
          value={selectedAnswer?.toString()}
          onValueChange={(value) => setSelectedAnswer(parseInt(value))}
        >
          {question.options.map((option, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center space-x-2 p-4 rounded-lg border transition-colors duration-200",
                hasAnswered && index === question.correctAnswer && "bg-green-100 border-green-500",
                hasAnswered && selectedAnswer === index && index !== question.correctAnswer && "bg-red-100 border-red-500"
              )}
            >
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-grow">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="mt-6 flex justify-end">
          {!hasAnswered ? (
            <Button onClick={handleCheck} disabled={selectedAnswer === null}>
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNext}>Continue</Button>
          )}
        </div>
      </Card>
    </div>
  );
}