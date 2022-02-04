import { Box, Stack, Typography } from "@mui/material";
import React, {
    useState,
    useEffect,
    useRef,
    ReactNode,
    useContext,
} from "react";
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            console.log(configState);
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
                backgroundColor: "blue",
                zIndex: 2,
                height: "100%",
                width: "7.5rem",
                marginRight: "2rem",
                textAlign: "center",
            }}
            ref={menuRef}
        >
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
                onClick={() => setOpen(!open)}
            >
                <Typography variant="body1">{name}</Typography>
            </Box>
            {open && (
                <Stack
                    direction="column"
                    sx={{
                        backgroundColor: "pink",
                    }}
                >
                    {children}
                </Stack>
            )}
        </Box>
    );
};
