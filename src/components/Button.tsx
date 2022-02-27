import { Box, SxProps, Theme } from "@mui/material";
import React from "react";
import { utility, colors, spacing } from "../themes";
import { Body1 } from "./Typography";

export const Button = ({
    text,
    onClick,
    sx,
}: {
    text: string;
    onClick: () => void;
    sx?: SxProps<Theme> | undefined;
}): JSX.Element => {
    return (
        <Box
            onClick={onClick}
            sx={{
                boxSizing: "border-box",
                height: "100%",
                minHeight: spacing.spacing5,
                width: spacing.spacing7,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                ...utility.radius,
                ...colors.primaryComponent.default,
                ...colors.primaryComponent.hover,
                ...sx,
            }}
        >
            <Body1>{text}</Body1>
        </Box>
    );
};
