import { Box, Stack } from "@mui/material";
import React from "react";
import { UiLayer } from "../uiLayer";
import { AdjustColours } from "./AdjustColours";
import { ToolbarMenu } from "./ToolbarMenu";
import { ToolbarMenuItem } from "./ToolbarMenuItem";

export const ToolbarContainer = ({
    uiLayers,
}: {
    uiLayers: UiLayer[];
}): JSX.Element => {
    const activeUiLayer = uiLayers.find((uiLayer: UiLayer) => {
        return uiLayer.visible === true;
    });

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
                    <AdjustColours activeUiLayer={activeUiLayer} />
                </ToolbarMenu>
            </Stack>
        </Box>
    );
};
