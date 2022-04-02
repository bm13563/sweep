import React from "react";

export const Icon = ({
    className,
    size = 5,
    onClick,
}: {
    className: string;
    size?: number;
    onClick?: () => void;
}): JSX.Element => {
    return (
        <div
            onClick={onClick}
            className={`flex align-middle inline-block cursor-pointer text-slate-900 ${className} h-${String(
                size
            )} w-${String(size)}`}
        />
    );
};
