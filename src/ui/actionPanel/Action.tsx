import React from "react";
import { HandleUi } from "../../hooks/HandleUi";

export const Action = ({ className }: { className?: string }): JSX.Element => {
    const component = HandleUi((state) => state.component);
    return (
        <>
            {component && (
                <div
                    className={`absolute w-1/6 z-2 p-4 bg-emerald-400 border ${className}`}
                >
                    {component}
                </div>
            )}
        </>
    );
};
