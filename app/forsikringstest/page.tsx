'use client';

import React from "react";
import QuestionCard from "../ui/forsikringstest/question_card";
import QuizEndCard from "../ui/forsikringstest/quiz_end_card";
import { QuestionId } from "../lib/forsikringstest_questions";

export default function CivilvognsTestPage() {
    const [isDone, setIsDone] = React.useState(false);
    const [partner, setPartner] = React.useState<QuestionId>('rki');
    const [answers, setAnswers] = React.useState<{ [question: string]: string }>({});


    return (
        <div>
            {isDone ?
                <QuizEndCard partner={partner} answers={answers} />
                :
                <QuestionCard setPartner={setPartner} setIsDone={setIsDone} setAnswers={setAnswers} />}
        </div>

    );
}
