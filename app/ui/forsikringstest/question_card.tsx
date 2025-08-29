'use client';

import React from "react";
import { questions, QuestionId } from "@/app/lib/forsikringstest_questions";
import { trackPlausible } from "@/app/lib/plausible"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ChoiceButton from "./choice_button";
import { useRouter } from "next/navigation";



export default function QuestionCard(props: {
    setIsDone: (done: boolean) => void,
    setPartner: (id: QuestionId) => void,
    setAnswers: React.Dispatch<React.SetStateAction<{ [question: string]: string }>>
}) {

    const [showTextField, setShowTextField] = React.useState<boolean>(false);
    const [textInput, setTextInput] = React.useState<string>("");
    const [currentQuestionId, setCurrentQuestionId] = React.useState<QuestionId>('rki');
    const currentQuestion = questions[currentQuestionId];
    const [history, setHistory] = React.useState<QuestionId[]>(['rki']);
    const router = useRouter();

    const style = showTextField ? 'w-full text-center text-white p-4 bg-black rounded-lg border hover:bg-gray-600 transition' : 'w-full text-center p-4 bg-white rounded-lg border hover:bg-gray-100 transition'

    const goBack = () => {
        if (history.length > 1) {
            const newHistory = [...history];
            newHistory.pop(); // Remove the last question
            setHistory(newHistory);
            setCurrentQuestionId(newHistory[newHistory.length - 1]);
            setShowTextField(false);
            setTextInput("");
        }
    }

    const handleChoice = (selectedText: string, nextId: QuestionId | null) => {
        trackPlausible("Next step", { step: nextId });

        props.setAnswers(prev => ({
            ...prev, // keep previous answers
            [currentQuestion.question!]: selectedText // overwrite/update current answer
        }));

        setTextInput("");
        setShowTextField(false);
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
                        {currentQuestion.id === "declined" ?
                            <button
                                className="rounded-xl bg-black text-white px-4 py-2"
                                onClick={() => router.push("/")}
                            >
                                {currentQuestion.buttonText || "Færdig"}
                            </button>
                            :
                            <button
                                onClick={() => {
                                    props.setPartner(currentQuestionId);
                                    props.setIsDone(true);
                                }}
                                className="rounded-xl bg-black text-white px-4 py-2"
                            >
                                {currentQuestion.buttonText || "Færdig"}
                            </button>
                        }
                    </CardFooter>
                </div>
                :
                <div className="flex flex-col md:flex-row md:gap-6 p-4 min-h-[100px] justify-center">
                    <div className="w-full md:w-4/5 flex flex-col justify-center ">
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


                                {currentQuestion.type === "questionTextInput" && (
                                    <>
                                        <button
                                            key={0}
                                            onClick={() => setShowTextField(!showTextField)}
                                            className={style}
                                        >
                                            {currentQuestion.textInputOption}
                                        </button>
                                        {showTextField && (
                                            <input
                                                required
                                                name="myInput"
                                                placeholder="Uddyb..."
                                                onChange={e => setTextInput(e.target.value)}
                                                className="invalid:border-red-800 w-10/11 self-center h-7 bg-white border-1 border-gray-400 p-5 "
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-end mt-8">
                            {history.length > 1 &&
                                <button className="rounded-xl bg-gray-200 hover:bg-gray-300 text-black px-4 py-2" onClick={goBack}>
                                    tilbage
                                </button>
                            }
                            {showTextField &&
                                <button
                                    disabled={!textInput.length}
                                    className={"disabled:bg-gray-500 rounded-xl bg-black hover:bg-gray-600 text-white px-4 py-2"}
                                    onClick={() => handleChoice(textInput, currentQuestion.textInputNext!)}
                                >
                                    bekræft
                                </button>
                            }

                        </CardFooter>
                    </div>
                </div>
            }
        </Card>

    );
}
