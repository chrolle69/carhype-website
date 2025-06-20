'use client';

import clsx from "clsx";

type ChoiceButtonProps = {
    option: string;
    idx: number;
    selectedIdx: number | null;
    correctIdx: number;
    showAnswer: boolean;
    onClick: (idx: number) => void;
};

export default function ChoiceButton(props: ChoiceButtonProps) {
    const isSelected = props.selectedIdx === props.idx;
    const isCorrect = props.idx === props.correctIdx;
    const buttonClasses = clsx(
        "text-left text-[11px] md:text-[14px] p-2 border rounded-xl",
        {
            "bg-green-500 text-white": props.showAnswer && isCorrect,
            "bg-red-500 text-white": props.showAnswer && isSelected && !isCorrect,
            "bg-black text-white": !props.showAnswer && isSelected,
            "bg-white": !isSelected && (!props.showAnswer || !isCorrect),
        }
    );


    return (
        <button disabled={props.showAnswer} className={buttonClasses} onClick={() => props.onClick(props.idx)}>
            {props.option}
        </button>
    );
}