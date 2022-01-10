import { Box } from "@mui/material";
import React from "react";

export const ActionContainer = ({
    action,
}: {
    action: JSX.Element;
}): JSX.Element => {
    return (
        <Box
            sx={{
                position: "absolute",
                backgroundColor: "blue",
                width: "30%",
                height: "50%",
                zIndex: 2,
            }}
        >
            <Box sx={{ zIndex: 3 }}>{action}</Box>
        </Box>
    );
};
