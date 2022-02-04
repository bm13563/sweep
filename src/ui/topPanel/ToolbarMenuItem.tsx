import { Box } from "@mui/material";
import React, { ReactNode } from "react";

export const ToolbarMenuItem = ({
    onClick,
    children,
}: {
    onClick: () => void;
    children?: ReactNode;
}): JSX.Element => {
    return (
        <Box onClick={onClick} sx={{ height: "100%", padding: "0.2rem" }}>
            {children}
        </Box>
    );
};
