import React from "react";
import { Button } from "./Button";

export const SecondaryButton = ({
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
                active ? "bg-blue-600 hover:bg-blue-800" : "disabled"
            } ${className}`}
        />
    );
};
