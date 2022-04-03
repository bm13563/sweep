import React from "react";
import { Body1 } from "./Typography";

export const ErrorNotification = ({
    errorText,
    className,
}: {
    errorText: string;
    className?: string;
}): JSX.Element => {
    return (
        <div className={`bg-red-300 border ${className}`}>
            <Body1>{errorText}</Body1>
        </div>
    );
};
