import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useCallback, useContext, useEffect } from "react";
import { Layer } from "./Layer";
import { getActiveUiLayer, UiLayer } from "../uiLayer";
import update from "immutability-helper";
import { AddLayer } from "./AddLayer";
import { AddLayerFromConfig } from "./AddLayerFromConfig";
import { ActionState } from "../actionPanel/ActionContext";

export const LayerContainer = ({
    uiLayers,
    updateUiLayers,
}: {
    uiLayers: UiLayer[];
    updateUiLayers: (uiLayer: UiLayer[]) => void;
}): JSX.Element => {
    const { activeUiLayer } = getActiveUiLayer(uiLayers);
    const { configState } = useContext(ActionState);

    const remove = (uiLayer: UiLayer) => {
        const indexToRemove = uiLayers.indexOf(uiLayer);
        updateUiLayers(
            update(uiLayers, {
                $splice: [[indexToRemove, 1]],
            })
        );
    };

    const updateVisibility = (uiLayer: UiLayer) => {
        const indexToUpdate = uiLayers.indexOf(uiLayer);
        updateUiLayers(
            update(uiLayers, {
                [indexToUpdate]: {
                    visible: {
                        $apply: function (visible) {
                            return !visible;
                        },
                    },
                },
            })
        );
    };

    const move = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            if (uiLayers.length === 1) return;
            const dragCard = uiLayers[dragIndex];
            updateUiLayers(
                update(uiLayers, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard],
                    ],
                })
            );
        },
        [uiLayers]
    );

    useEffect(() => {
        updateUiLayers(uiLayers);
    });

    return (
        <Container
            sx={{
                backgroundColor: "red",
                height: "100%",
                textAlign: "left",
                pointerEvents: configState ? "none" : "auto",
            }}
        >
            <Stack spacing={2} sx={{ height: "100%", width: "90%" }}>
                <Stack direction="row" sx={{ alignItems: "center" }}>
                    <Typography variant="h4">Layers</Typography>
                    <Box sx={{ marginLeft: "auto" }}>
                        <AddLayerFromConfig
                            uiLayers={uiLayers}
                            updateUiLayers={updateUiLayers}
                        />
                        <AddLayer
                            uiLayers={uiLayers}
                            updateUiLayers={updateUiLayers}
                        />
                    </Box>
                </Stack>
                {uiLayers.map((uiLayer, index) => {
                    return (
                        <Layer
                            key={uiLayer.uid}
                            uiLayer={uiLayer}
                            activeUiLayer={activeUiLayer}
                            index={index}
                            updateVisibility={updateVisibility}
                            remove={remove}
                            move={move}
                        />
                    );
                })}
            </Stack>
        </Container>
    );
};
