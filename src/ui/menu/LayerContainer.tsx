import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { defaultPseudolayer } from "../../utils/utils";
import { getDefaultPseudolayer, Pseudolayer } from "../map/layers/pseudolayer";
import { Layer } from "./Layer";
import { v4 as uuidv4 } from "uuid";
import { AddLayer, AddLayerProps } from "./AddLayer";
import { getLayer } from "../map/layers/layer";
import update from "immutability-helper";

export interface UiLayer {
    uid: string;
    name: string;
    visible: boolean;
    pseudolayer: Pseudolayer;
}

export const LayerContainer = ({
    setPseudolayer,
}: {
    setPseudolayer: (pseudolayer: Pseudolayer | undefined) => void;
}): JSX.Element => {
    const [uiLayers, setUiLayers] = useState<UiLayer[]>([
        {
            uid: uuidv4(),
            name: "OSM Road",
            visible: true,
            pseudolayer: defaultPseudolayer(),
        },
    ]);

    const addUiLayer = ({ name, type, source }: AddLayerProps) => {
        const layer = getLayer(type, source);
        const pseudolayer = getDefaultPseudolayer(layer);
        setUiLayers((prevUiLayerState: UiLayer[]) => {
            return [
                {
                    uid: uuidv4(),
                    name: name,
                    visible: true,
                    pseudolayer: pseudolayer,
                },
                ...prevUiLayerState,
            ];
        });
    };

    const remove = (uiLayer: UiLayer) => {
        setUiLayers(
            uiLayers.filter((stateLayer: UiLayer) => {
                return stateLayer.uid !== uiLayer.uid;
            })
        );
    };

    const updateVisibility = (uiLayer: UiLayer) => {
        setUiLayers(
            uiLayers.map((stateLayer: UiLayer) => {
                return stateLayer.uid === uiLayer.uid
                    ? { ...uiLayer, visible: !uiLayer.visible }
                    : { ...stateLayer };
            })
        );
    };

    const move = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            if (uiLayers.length === 1) return;
            const dragCard = uiLayers[dragIndex];
            setUiLayers(
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
        const activeUiLayer = uiLayers.find((uiLayer: UiLayer) => {
            return uiLayer.visible === true;
        });
        activeUiLayer
            ? setPseudolayer(activeUiLayer.pseudolayer)
            : setPseudolayer(undefined);
    });

    return (
        <>
            <Container
                sx={{
                    backgroundColor: "red",
                    height: "100%",
                    textAlign: "left",
                }}
            >
                <Stack spacing={2} sx={{ height: "100%" }}>
                    <Stack
                        direction="row"
                        sx={{ alignItems: "center", width: "90%" }}
                    >
                        <Typography variant="h4">Layers</Typography>
                        <Box sx={{ marginLeft: "auto" }}>
                            <AddLayer addUiLayer={addUiLayer} />
                        </Box>
                    </Stack>
                    {uiLayers.map((uiLayer, index) => {
                        return (
                            <Layer
                                key={uiLayer.pseudolayer.uid}
                                uiLayer={uiLayer}
                                index={index}
                                updateVisibility={updateVisibility}
                                remove={remove}
                                move={move}
                            />
                        );
                    })}
                </Stack>
            </Container>
        </>
    );
};
