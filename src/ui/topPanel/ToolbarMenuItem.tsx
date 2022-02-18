import { Box, Typography } from "@mui/material";
import React from "react";

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
        <Box
            onClick={active ? onClick : undefined}
            sx={{
                height: "100%",
                padding: "0.2rem",
                backgroundColor: active ? "pink" : "gray",
            }}
        >
            <Typography variant="caption">{name}</Typography>
        </Box>
    );
};
