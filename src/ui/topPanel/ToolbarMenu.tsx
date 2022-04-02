import React, { useState, useEffect, useRef, useContext } from "react";
import { Button } from "../../components/Button";
import { VerticalStack } from "../../components/VerticalStack";
import { ActionState } from "../actionPanel/ActionContext";

export const ToolbarMenu = ({
    name,
    children,
}: {
    name: string;
    children?: JSX.Element | JSX.Element[];
}): JSX.Element => {
    const menuRef = useRef<HTMLDivElement>(null);
    const { configState } = useContext(ActionState);

    const [open, setOpen] = useState(false);

    // FIXME: can this be a hook
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (configState) return;

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef, configState]);

    return (
        <div ref={menuRef} className="mr-10 z-2 text-center">
            <Button text={name} onClick={() => setOpen(!open)} />
            <VerticalStack className={`${!open && "invisible"}`} spacing={2}>
                {children}
            </VerticalStack>
        </div>
    );
};
