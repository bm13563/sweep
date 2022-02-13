import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";

export const ToolbarMenuItem = ({
    onClick,
    name,
}: {
    onClick: () => void;
    name: string;
}): JSX.Element => {
    return (
        <Box onClick={onClick} sx={{ height: "100%", padding: "0.2rem" }}>
            <Typography variant="caption">{name}</Typography>
        </Box>
    );
};
