'use client';

import React from "react";
import QuestionCard from "../ui/forsikringstest/question_card";
import QuizEndCard from "../ui/forsikringstest/quiz_end_card";
import { QuestionId } from "../lib/forsikringstest_questions";

export default function CivilvognsTestPage() {
    const [isDone, setIsDone] = React.useState(false);
    const [partner, setPartner] = React.useState<QuestionId>('start');

    return (
        <div>
            {isDone ?
                <QuizEndCard partner={partner} />
                :
                <QuestionCard setPartner={setPartner} setIsDone={setIsDone} />}
        </div>

    );
}
