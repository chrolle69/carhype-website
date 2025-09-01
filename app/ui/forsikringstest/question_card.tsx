'use client';

import React from "react";
import { questions, QuestionId } from "@/app/lib/forsikringstest_questions";
import { trackPlausible } from "@/app/lib/plausible"
import {
    Card,
} from "@/components/ui/card";
import UiResult from "./ui_result";
import UiQuestionTextInput from "./ui_questionTextInput";
import UiQuestion from "./ui_question";
import UiForm from "./ui_form";
import { useRouter } from "next/navigation";




export default function QuestionCard() {

    const [name, setName] = React.useState<string>("");
    const [phone, setPhone] = React.useState<string>("");
    const [additional, setAdditional] = React.useState<string>("");
    const [showTextField, setShowTextField] = React.useState<boolean>(false);
    const [textInput, setTextInput] = React.useState<string>("");
    const [currentQuestionId, setCurrentQuestionId] = React.useState<QuestionId>('name');
    const currentQuestion = questions[currentQuestionId];
    const [history, setHistory] = React.useState<QuestionId[]>(['name']);
    const [answers, setAnswers] = React.useState<{ [question: string]: string }>({});



    const [isLoading, setIsLoading] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");

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
        trackPlausible(`Next step ${nextId}`);


        setAnswers(prev => ({
            ...prev, // keep previous answers
            [currentQuestion.id!]: selectedText // overwrite/update current answer
        }));

        setTextInput("");
        setShowTextField(false);

        if (nextId) {

            setHistory(prev => [...prev, nextId]);
            setCurrentQuestionId(nextId);
        }
    };


    const handleFormStep = (nextId: QuestionId | null) => {
        trackPlausible(`Next step ${nextId}`);
        if (nextId) {
            setHistory(prev => [...prev, nextId]);
            setCurrentQuestionId(nextId);
        }
    }

    const sendData = async (nextId: QuestionId | null) => {
        setError("");
        setMessage("");
        setIsLoading(true);

        const body = {
            name,
            phoneNo: phone,
            additional,
            partner: nextId,
            answers: answers
        };

        try {
            const res = await fetch("/api/createLead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setIsSubmitted(true);
                setMessage("Du er nu oprettet og vil blive kontaktet med et tilbud indenfor 24 timer!");
            } else {
                setError(data.message || "Noget gik galt, prøv igen senere.");
            }
        } catch (err) {
            console.error(err);
            setError("Der skete en fejl ved tilmelding.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full w-9/10 md:max-w-3xl mx-auto my-8 shadow-lg bg-orange-50">
            {isSubmitted ? (
                <div className="flex flex-col items-center justify-center p-4 gap-4">
                    <h2 className="text-xl font-bold text-center">{error ? "Fejl" : "Succes!"}</h2>
                    <p className="text-center">{error || message}</p>
                    {!error && (
                        <button
                            className="rounded-xl bg-black hover:bg-gray-600 text-white px-4 py-2"
                            onClick={() => router.push("/")}
                        >
                            Færdig
                        </button>
                    )}
                </div>
            ) : (
                currentQuestion.type === 'result' ? (
                    UiResult({ currentQuestion })
                ) : currentQuestion.type === 'questionTextInput' ? (
                    UiQuestionTextInput(currentQuestion, handleChoice, setShowTextField, showTextField, style, setTextInput, history, goBack, textInput)
                ) : currentQuestion.type === 'question' ? (
                    UiQuestion(currentQuestion, handleChoice, history, goBack)
                ) : currentQuestion.type === 'form' && (
                    UiForm(currentQuestion, name, setName, history, goBack, handleFormStep, phone, setPhone, additional, setAdditional, isLoading, sendData, error, message)
                )
            )
            }
        </Card >

    );
}
