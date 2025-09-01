'use client';

import { Question } from "@/app/lib/forsikringstest_questions";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface UiResultProps {
    currentQuestion: Question;
}

export default function UiResult({ currentQuestion }: UiResultProps) {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-5 p-4">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{currentQuestion.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <p>{currentQuestion.message}</p>
            </CardContent>
            <CardFooter className="flex justify-center">
                {currentQuestion.id === "declined" ? (
                    <button
                        className="rounded-xl bg-black text-white px-4 py-2"
                        onClick={() => router.push("/")}
                    >
                        {currentQuestion.buttonText || "Færdig"}
                    </button>
                ) : null}
            </CardFooter>
        </div>
    );
}
