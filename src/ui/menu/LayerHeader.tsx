import { Typography, Box, Stack } from "@mui/material";
import React from "react";
import { AddLayer } from "./AddLayer";

export const LayerHeader = (): JSX.Element => {
    return (
        <Box
            sx={{
                width: "90%",
                justifyContent: "center",
            }}
        >
            <Stack direction="row" sx={{ alignItems: "center" }}>
                <Typography variant="h4">Layers</Typography>
                <Box sx={{ marginLeft: "auto" }}>
                    <AddLayer />
                </Box>
            </Stack>
        </Box>
    );
};
