import React from "react";
import { HandleUiState } from "../../hooks/HandleUiState";

export const Action = ({ className }: { className?: string }): JSX.Element => {
    const component = HandleUiState((state) => state.component);
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
