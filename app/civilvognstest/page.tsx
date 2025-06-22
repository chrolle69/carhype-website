'use client';

import React from "react";
import QuestionCard from "../ui/civilvognstest/question_card";
import QuizEndCard from "../ui/civilvognstest/quiz_end_card";

export default function CivilvognsTestPage() {
    const [isDone, setIsDone] = React.useState(false);
    const [correctCount, setCorrectCount] = React.useState(0);

    return (
        <div>
            {isDone ?
                <QuizEndCard correctCount={correctCount} />
                :
                <QuestionCard setCorrectCount={setCorrectCount} correctCount={correctCount} setIsDone={setIsDone} />}
        </div>

    );
}
