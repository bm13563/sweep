import { Typography, Box, Stack } from "@mui/material";
import React from "react";
import { Pseudolayer } from "../map/layers/pseudolayer";
import { AddLayer } from "./AddLayer";

export const LayerHeader = ({
    addPseudolayer,
}: {
    addPseudolayer: (pseudolayer: Pseudolayer) => void;
}): JSX.Element => {
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
                    <AddLayer addPseudolayer={addPseudolayer} />
                </Box>
            </Stack>
        </Box>
    );
};
