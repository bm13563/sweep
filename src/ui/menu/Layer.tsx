import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import { Pseudolayer } from "../map/layers/pseudolayer";
import { UiLayer } from "./LayerPanel";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const Layer = ({
    uiLayer,
    updateVisibility,
}: {
    uiLayer: UiLayer;
    updateVisibility: (uiLayer: UiLayer) => void;
}): JSX.Element => {
    const changeVisibility = () => {
        updateVisibility(uiLayer);
    };

    return (
        <Box
            sx={{
                width: "90%",
                height: "5%",
                backgroundColor: "green",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <Stack direction="row">
                <Box>{uiLayer.name}</Box>
                {uiLayer.visible ? (
                    <VisibilityOffIcon
                        onClick={changeVisibility}
                        sx={{ marginLeft: "auto" }}
                    />
                ) : (
                    <RemoveRedEyeIcon
                        onClick={changeVisibility}
                        sx={{ marginLeft: "auto" }}
                    />
                )}
            </Stack>
        </Box>
    );
};
