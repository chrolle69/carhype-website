'use client';

import React from "react";
import clsx from "clsx";

type Props = {
    current: number;
    total: number;
    height?: string; // optional for custom height, e.g., "h-4"
};

export default function ScoreBar({ current, total, height = "h-6" }: Props) {
    const percent = Math.min((current / total) * 100, 100);

    return (
        <div className={clsx("w-full bg-gray-200 rounded-full relative overflow-hidden", height)}>
            <div
                className="absolute top-0 left-0 bg-green-500 transition-all duration-500"
                style={{ width: `${percent}%`, height: "100%" }}
            />
            <div className="relative z-10 w-full text-center font-medium text-sm text-black">
                {current} / {total}
            </div>
        </div>
    );
}
