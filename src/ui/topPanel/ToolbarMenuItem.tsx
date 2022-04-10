import React from "react";
import { Subscript1 } from "../../components/Typography";

export const ToolbarMenuItem = ({
    onClick,
    name,
    active,
}: {
    onClick: () => void;
    name: string;
    active: boolean;
}): JSX.Element => {
    return (
        <div
            className={`h-full w-full p-1 ${
                !active ? "disabled" : "bg-slate-50 hover:bg-slate:400"
            }`}
            onClick={onClick}
        >
            <Subscript1>{name}</Subscript1>
        </div>
    );
};
