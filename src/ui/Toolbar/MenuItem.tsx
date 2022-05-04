import React from "react";
import { Subscript2 } from "../../components/Typography";

export const MenuItem = ({
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
                !active
                    ? "disabled"
                    : "bg-slate-50 hover:bg-slate:400  cursor-pointer"
            }`}
            onClick={onClick}
        >
            <Subscript2>{name}</Subscript2>
        </div>
    );
};
