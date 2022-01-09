import { Box, Stack } from "@mui/material";
import React from "react";
import { UiLayer } from "./LayerPanel";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";

export const Layer = ({
    uiLayer,
    updateVisibility,
    remove,
}: {
    uiLayer: UiLayer;
    updateVisibility: (uiLayer: UiLayer) => void;
    remove: (uiLayer: UiLayer) => void;
}): JSX.Element => {
    const changeVisibility = () => {
        updateVisibility(uiLayer);
    };

    const removeUiLayer = () => {
        remove(uiLayer);
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
                <Stack direction="row" spacing={1} sx={{ marginLeft: "auto" }}>
                    <DeleteIcon onClick={removeUiLayer} />
                    {uiLayer.visible ? (
                        <VisibilityOffIcon onClick={changeVisibility} />
                    ) : (
                        <RemoveRedEyeIcon onClick={changeVisibility} />
                    )}
                </Stack>
            </Stack>
        </Box>
    );
};
