'use client';

import React from "react";
import { questions } from "@/app/lib/civilvognstest_questions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChoiceButton from "./choice_button";

export default function QuestionCard(props: { setIsDone: (arg0: boolean) => void, correctCount: number, setCorrectCount: (arg0: number) => void }) {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null);
  const [showAnswer, setShowAnswer] = React.useState(false);

  const handleButtonClick = () => {
    if (!showAnswer) {
      // First click: show answer
      setShowAnswer(true);
    } else {
      // Second click: go to next question
      if (selectedIdx === questions[currentQuestion].correct) {
        props.setCorrectCount(props.correctCount + 1);
      }
      if (currentQuestion >= questions.length - 1) {
        props.setIsDone(true)
        return;
      }
      setCurrentQuestion((prev) => prev + 1);
      setSelectedIdx(null);
      setShowAnswer(false);
    }
  };

  return (
    <Card className="w-full w-9/10 md:max-w-3xl mx-auto my-8 shadow-lg bg-orange-50">

      <div>
        <div className="flex flex-col md:flex-row md:gap-6 p-4 min-h-[300px]">
          <div className="w-full md:w-1/2 max-h-68 md:max-h-120 overflow-hidden rounded-2xl">
            <img
              src={questions[currentQuestion].image}
              alt="Question Image"
              className="w-full h-full object-cover object-top rounded-xl"
            />
          </div>

          {/* Question + options container - right side on md+ */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <CardHeader className="m-4 p-0">
              <CardTitle>{questions[currentQuestion].question}</CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div className="flex flex-col gap-2">
                {questions[currentQuestion].options.map((option, idx) => (
                  <ChoiceButton
                    option={option}
                    key={idx}
                    idx={idx}
                    selectedIdx={selectedIdx}
                    correctIdx={questions[currentQuestion].correct}
                    showAnswer={showAnswer}
                    onClick={setSelectedIdx}
                  />
                ))}
              </div>
            </CardContent>
          </div>
        </div>

        <CardFooter className="flex justify-center">
          <button
            onClick={handleButtonClick}
            className="rounded-xl bg-black text-white px-4 py-2 disabled:opacity-50"
            disabled={selectedIdx === null}
          >
            {showAnswer ? "Næste" : "Bekræft"}
          </button>
        </CardFooter>
      </div>

    </Card>

  );
}
