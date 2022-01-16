import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { defaultPseudolayer } from "../../utils/utils";
import { getDefaultPseudolayer, Pseudolayer } from "../map/layers/pseudolayer";
import { Layer } from "./Layer";
import { v4 as uuidv4 } from "uuid";
import { LayerHeader } from "./LayerHeader";
import { AddLayerProps } from "./AddLayer";
import { getLayer } from "../map/layers/layer";

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
                    <LayerHeader addUiLayer={addUiLayer} />
                    {uiLayers.map((uiLayer) => {
                        return (
                            <Layer
                                key={uiLayer.pseudolayer.uid}
                                uiLayer={uiLayer}
                                updateVisibility={updateVisibility}
                                remove={remove}
                            />
                        );
                    })}
                </Stack>
            </Container>
        </>
    );
};
