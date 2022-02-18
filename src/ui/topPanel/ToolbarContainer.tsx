import { Box, Stack } from "@mui/material";
import React, { useContext } from "react";
import { ActionState } from "../actionPanel/ActionContext";
import { UiLayer } from "../uiLayer";
import { UndoRedo } from "./file/UndoRedo";
import { RgbManipulation } from "./processing/RgbManipulation";
import { ToolbarMenu } from "./ToolbarMenu";

export const ToolbarContainer = ({
    uiLayers,
    updateUiLayers,
}: {
    uiLayers: UiLayer[];
    updateUiLayers: (uiLayer: UiLayer[]) => void;
}): JSX.Element => {
    const { configState } = useContext(ActionState);

    return (
        <Box
            sx={{
                backgroundColor: "purple",
                height: "100%",
                paddingLeft: "15.625rem",
                pointerEvents: configState ? "none" : "auto",
            }}
        >
            <Stack direction="row" sx={{ height: "100%" }}>
                <ToolbarMenu name="File">
                    <UndoRedo
                        uiLayers={uiLayers}
                        updateUiLayers={updateUiLayers}
                    />
                </ToolbarMenu>
                <ToolbarMenu name="Processing">
                    <RgbManipulation
                        uiLayers={uiLayers}
                        updateUiLayers={updateUiLayers}
                    />
                </ToolbarMenu>
            </Stack>
        </Box>
    );
};
