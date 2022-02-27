import { Stack } from "@mui/material";
import React from "react";

export const RightAlignedStack = ({
    spacing,
    children,
}: {
    spacing: number;
    children?: JSX.Element[];
}) => {
    return (
        <Stack direction="row" spacing={spacing} sx={{ marginLeft: "auto" }}>
            {children}
        </Stack>
    );
};
