import { Box, Stack } from "@mui/material";
import React from "react";
import { UiLayer } from "../uiLayer";
import { RgbManipulation } from "./RgbManipulation";
import { ToolbarMenu } from "./ToolbarMenu";

export const ToolbarContainer = ({
    uiLayers,
    updateUiLayers,
}: {
    uiLayers: UiLayer[];
    updateUiLayers: (uiLayer: UiLayer[]) => void;
}): JSX.Element => {
    return (
        <Box
            sx={{
                backgroundColor: "purple",
                height: "100%",
                paddingLeft: "15.625rem",
            }}
        >
            <Stack direction="row" sx={{ height: "100%" }}>
                <ToolbarMenu name="Image processing">
                    <RgbManipulation
                        uiLayers={uiLayers}
                        updateUiLayers={updateUiLayers}
                    />
                </ToolbarMenu>
            </Stack>
        </Box>
    );
};
