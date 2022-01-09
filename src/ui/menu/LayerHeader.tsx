import { Typography, Box, Stack } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

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
                <AddIcon sx={{ marginLeft: "auto", bottom: "0px" }} />
            </Stack>
        </Box>
    );
};
