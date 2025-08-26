'use client';

import { Option, QuestionId } from "@/app/lib/forsikringstest_questions";

type ChoiceButtonProps = {
    option: Option;
    idx: number;
    goToNext: (selectedText: string, nextId: QuestionId | null) => void;
};

export default function ChoiceButton(props: ChoiceButtonProps) {
    return (
        <button
            key={props.idx}
            onClick={() => props.goToNext(props.option.text, props.option.next)}
            className="w-full whitespace-pre-line text-center p-4 bg-white rounded-lg border hover:bg-gray-100 transition"
        >
            {props.option.text}
        </button>
    );
}
