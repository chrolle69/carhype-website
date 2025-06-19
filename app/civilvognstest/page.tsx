'use client';

import React from "react";
import QuestionCard from "../ui/civilvognstest/question_card";
import UserFormDialog from "../ui/civilvognstest/user_form_dialog";

export default function CivilvognsTestPage() {
    const [isDone, setIsDone] = React.useState(false);

    return (
        <>
            <QuestionCard setIsDone={setIsDone} />
            <UserFormDialog open={isDone} />
        </>
    );
}
