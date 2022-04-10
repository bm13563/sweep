import React from "react";
import { Button } from "./Button";

export const PrimaryButton = ({
    text,
    onClick,
    active = true,
    className,
}: {
    text: string;
    onClick: () => void;
    active?: boolean;
    className?: string;
}): JSX.Element => {
    return (
        <Button
            text={text}
            onClick={onClick}
            className={`${
                active ? "bg-purple-600 hover:bg-purple-800" : "disabled"
            } ${className}`}
        />
    );
};
