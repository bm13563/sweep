import { Box, Stack, Typography } from "@mui/material";
import React from "react";

export const AddLayer = ({ text }: { text: string }) => {
    return (
        <Box>
            <Stack>
                <Typography variant="h4">Layers</Typography>
            </Stack>
        </Box>
    );
};
