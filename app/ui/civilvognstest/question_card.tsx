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
import clsx from "clsx";
import ChoiceButton from "./choice_button";

export default function QuestionCard(props: { setIsDone: (arg0: boolean) => void; }) {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null);
  const [showAnswer, setShowAnswer] = React.useState(false);

  const handleButtonClick = () => {
    if (!showAnswer) {
      // First click: show answer
      setShowAnswer(true);
    } else {
      // Second click: go to next question
      if (currentQuestion >= questions.length - 1) {
        alert("Du har gennemført alle spørgsmål!");
        return;
      }
      props.setIsDone(true);
      setCurrentQuestion((prev) => prev + 1);
      setSelectedIdx(null);
      setShowAnswer(false);
    }
  };

  return (
    <Card className="w-full max-w-2xs md:max-w-3xl mx-auto my-8 shadow-lg bg-orange-50">
      <div className="flex flex-col md:flex-row md:gap-6 p-4 min-h-[400px]">

        <div className="w-full md:w-1/2 max-h-58 md:max-h-120 overflow-hidden rounded-2xl">
          <img
            src={questions[currentQuestion].image}
            alt="Question Image"
            className="w-full h-full object-cover object-top rounded-xl"
          />
        </div>

        {/* Question + options container - right side on md+ */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <CardHeader className="mb-4 p-0">
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
    </Card>

  );
}
