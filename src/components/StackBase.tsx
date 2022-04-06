import React, { Children } from "react";

export const StackBase = ({
    className = "",
    children,
}: {
    spacing?: number;
    className?: string;
    children?: JSX.Element | JSX.Element[];
}): JSX.Element => {
    return (
        <div className={`${className}`}>
            {Children.map(children, (child) => {
                return <div className={`children:box-border`}>{child}</div>;
            })}
        </div>
    );
};
