import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { Layer } from "./Layer";
import { generateUiLayer, getActiveUiLayer, UiLayer } from "../uiLayer";
import update from "immutability-helper";
import { AddLayer, AddLayerProps } from "./AddLayer";
import { generateLayer2 } from "../mapPanel/layers/layer2";
import { generatePseudolayer2 } from "../mapPanel/layers/pseudolayer2";
import { baseVertex } from "../../webgl/shaders/base.vertex";
import { baseFragment } from "../../webgl/shaders/base.fragment";

export const LayerContainer = ({
    uiLayers,
    updateUiLayers,
}: {
    uiLayers: UiLayer[];
    updateUiLayers: (uiLayer: UiLayer[]) => void;
}): JSX.Element => {
    const { activeUiLayer } = getActiveUiLayer(uiLayers);

    const addUiLayer = ({ name, type, url }: AddLayerProps) => {
        const layer = generateLayer2({ type: type, url: url });
        const pseudolayer = generatePseudolayer2({
            inputs: { u_image: layer },
            variables: {},
            shaders: { vertexShader: baseVertex, fragmentShader: baseFragment },
        });
        const uiLayer = generateUiLayer({
            name: name,
            pseudolayer: pseudolayer,
        });
        updateUiLayers(
            update(uiLayers, {
                $unshift: [uiLayer],
            })
        );
    };

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
            }}
        >
            <Stack spacing={2} sx={{ height: "100%", width: "90%" }}>
                <Stack direction="row" sx={{ alignItems: "center" }}>
                    <Typography variant="h4">Layers</Typography>
                    <Box sx={{ marginLeft: "auto" }}>
                        <AddLayer addUiLayer={addUiLayer} />
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
