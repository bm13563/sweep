import React from "react";
import { Subscript2 } from "./Typography";

export const ErrorNotification = ({
    errorText,
    className,
}: {
    errorText: string;
    className?: string;
}): JSX.Element => {
    return (
        <div className={`bg-red-300 border text-center ${className}`}>
            <Subscript2>{errorText}</Subscript2>
        </div>
    );
};
