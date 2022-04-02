import React, { Children } from "react";

export const VerticalStack = ({
    spacing = 0,
    className = "",
    children,
}: {
    spacing?: number;
    className?: string;
    children?: JSX.Element | JSX.Element[];
}): JSX.Element => {
    return (
        <div className={`flex flex-col justify-center ${className}`}>
            {Children.map(children, (child, index) => {
                return (
                    <div
                        className={`mt-${
                            index == 0 ? "0" : String(spacing)
                        } children:box-border`}
                    >
                        {child}
                    </div>
                );
            })}
        </div>
    );
};
