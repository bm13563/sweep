import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Layer } from "./Layer";
import { UiLayer } from "../uiLayer";
import { AddLayer } from "./AddLayer";
import { AddLayerFromConfig } from "./AddLayerFromConfig";
import { ActionState } from "../actionPanel/ActionContext";
import { RightAlignedStack } from "../../components/RightAlignedStack";
import { Header1 } from "../../components/Typography";

export const LayerContainer = ({
    uiLayers,
    updateUiLayers,
}: {
    uiLayers: UiLayer[];
    updateUiLayers: (uiLayer: UiLayer[]) => void;
}): JSX.Element => {
    const { configState } = useContext(ActionState);

    useEffect(() => {
        updateUiLayers(uiLayers);
    });

    return (
        <Container
            sx={{
                height: "100%",
                textAlign: "left",
                pointerEvents: configState ? "none" : "auto",
            }}
        >
            <Stack spacing={2} sx={{ height: "100%", width: "90%" }}>
                <Stack direction="row" sx={{ alignItems: "center" }}>
                    <Header1>Layers</Header1>
                    <RightAlignedStack spacing={1}>
                        <AddLayerFromConfig
                            uiLayers={uiLayers}
                            updateUiLayers={updateUiLayers}
                        />
                        <AddLayer
                            uiLayers={uiLayers}
                            updateUiLayers={updateUiLayers}
                        />
                    </RightAlignedStack>
                </Stack>
                {uiLayers.map((uiLayer, index) => {
                    return (
                        <Layer
                            key={uiLayer.uid}
                            uiLayer={uiLayer}
                            uiLayers={uiLayers}
                            updateUiLayers={updateUiLayers}
                            index={index}
                        />
                    );
                })}
            </Stack>
        </Container>
    );
};
