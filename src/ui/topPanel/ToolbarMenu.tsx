import { Box, Stack, Typography } from "@mui/material";
import React, {
    useState,
    useEffect,
    useRef,
    ReactNode,
    useContext,
} from "react";
import { Button } from "../../components/Button";
import { ActionState } from "../actionPanel/ActionContext";

export const ToolbarMenu = ({
    name,
    children,
}: {
    name: string;
    children?: ReactNode | ReactNode[];
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
        <Box
            sx={{
                zIndex: 2,
                height: "100%",
                width: "7.5rem",
                marginRight: "2rem",
                textAlign: "center",
            }}
            ref={menuRef}
        >
            <Button text={name} onClick={() => setOpen(!open)} />
            <Stack
                direction="column"
                sx={{
                    display: open ? "" : "none",
                }}
                onClick={() => setOpen(false)}
            >
                {children}
            </Stack>
        </Box>
    );
};
