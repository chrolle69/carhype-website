'use client';

import React from "react";
import { questions, QuestionId } from "@/app/lib/forsikringstest_questions";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ChoiceButton from "./choice_button";



export default function QuestionCard(props: { setIsDone: (arg0: boolean) => void, setPartner: (arg0: QuestionId) => void }) {
    const [answers, setAnswers] = React.useState<{ [questionId: string]: string }>({});
    const [currentQuestionId, setCurrentQuestionId] = React.useState<QuestionId>('start');
    const currentQuestion = questions[currentQuestionId];
    const [history, setHistory] = React.useState<QuestionId[]>(['start']);

    const goBack = () => {
        if (history.length > 1) {
            const newHistory = [...history];
            newHistory.pop(); // Remove the last question
            setHistory(newHistory);
            setCurrentQuestionId(newHistory[newHistory.length - 1]);
        }
    }

    const handleChoice = (selectedText: string, nextId: QuestionId | null) => {
        setAnswers(prev => ({ ...prev, [currentQuestionId]: selectedText }));
        if (nextId) {
            setHistory(prev => [...prev, nextId]);
            setCurrentQuestionId(nextId);
        }
    };

    return (
        <Card className="w-full w-9/10 md:max-w-3xl mx-auto my-8 shadow-lg bg-orange-50">
            {currentQuestion.type === 'result' ?
                <div className="flex flex-col gap-5 p-4">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">{currentQuestion.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p>{currentQuestion.message}</p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <button
                            onClick={() => {
                                props.setPartner(currentQuestionId);
                                props.setIsDone(true);
                            }}
                            className="rounded-xl bg-black text-white px-4 py-2"
                        >
                            {currentQuestion.buttonText || "Færdig"}
                        </button>
                    </CardFooter>
                </div>
                :
                <div className="flex flex-col md:flex-row md:gap-6 p-4 min-h-[300px]">
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <CardHeader className="m-4 p-0">
                            <CardTitle className="leading-5 font-sans">{currentQuestion.question}</CardTitle>
                        </CardHeader>

                        <CardContent className="p-0">
                            <div className="flex flex-col gap-2">
                                {currentQuestion.options?.map((option, idx) => (
                                    <ChoiceButton
                                        option={option}
                                        key={idx}
                                        idx={idx}
                                        goToNext={handleChoice}
                                    />
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-start items-end mt-8">
                            {history.length > 1 &&
                                <button className="rounded-xl bg-gray-200 text-black px-4 py-2" onClick={goBack}>
                                    tilbage
                                </button>
                            }
                        </CardFooter>
                    </div>
                </div>
            }
        </Card>

    );
}
