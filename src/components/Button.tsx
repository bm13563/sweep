import React from "react";
import { Body1 } from "./Typography";

export const Button = ({
    text,
    onClick,
    className,
}: {
    text: string;
    onClick: () => void;
    className?: string;
}): JSX.Element => {
    return (
        <div
            className={`h-full flex flex-col justify-center items-center rounded cursor-pointer ${className}`}
            onClick={onClick}
        >
            <Body1>{text}</Body1>
        </div>
    );
};
