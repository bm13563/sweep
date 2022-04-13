import React, { useState, useRef, useContext } from "react";
import { PrimaryButton } from "../../components/PrimaryButton";
import { VerticalStack } from "../../components/VerticalStack";
import { HandleClickOutside } from "../../hooks/HandleClickOutside";
import { HandleUi } from "../../hooks/HandleUi";

export const ToolbarMenu = ({
    name,
    children,
}: {
    name: string;
    children?: JSX.Element | JSX.Element[];
}): JSX.Element => {
    const menuRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);
    const isDisplayed = HandleUi((state) => state.component);

    const clickOutsideCallback = () => {
        setOpen(false);
    };

    const exceptionCallback = () => {
        return !!isDisplayed;
    };

    HandleClickOutside(menuRef, clickOutsideCallback, exceptionCallback);

    return (
        <div ref={menuRef} className="mr-10 z-2 text-center">
            <PrimaryButton
                text={name}
                onClick={() => setOpen(!open)}
                className="w-30"
            />
            <VerticalStack className={`${!open && "invisible"}`}>
                {children}
            </VerticalStack>
        </div>
    );
};
