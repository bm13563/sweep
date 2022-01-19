import { Box, Stack, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

export const ToolbarMenu = ({
    name,
    children,
}: {
    name: string;
    children?: JSX.Element | JSX.Element[];
}): JSX.Element => {
    const menuRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
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
    }, [menuRef]);

    return (
        <Box
            sx={{
                backgroundColor: "blue",
                zIndex: 2,
                height: "100%",
                width: "10%",
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
