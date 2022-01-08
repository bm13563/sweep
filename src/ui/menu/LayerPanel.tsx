import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { defaultPseudolayer, flippedPseudolayer } from "../../utils/utils";
import { Pseudolayer } from "../map/layers/pseudolayer";
import { Layer } from "./Layer";
import { v4 as uuidv4 } from "uuid";
import { setConstantValue } from "typescript";

export interface UiLayer {
    uid: string;
    name: string;
    visible: boolean;
    pseudolayer: Pseudolayer;
}

export const LayerPanel = ({
    setActive,
}: {
    setActive: (pseudolayer: Pseudolayer | undefined) => void;
}): JSX.Element => {
    const [uiLayers, setUiLayers] = useState<UiLayer[]>([
        {
            uid: uuidv4(),
            name: "OSM Road",
            visible: true,
            pseudolayer: defaultPseudolayer(),
        },
    ]);

    const addPseudolayer = () => {
        setUiLayers((lastPseudolayer: UiLayer[]) => {
            return [
                ...lastPseudolayer,
                {
                    uid: uuidv4(),
                    name: "Flipped OSM Road",
                    visible: true,
                    pseudolayer: flippedPseudolayer(),
                },
            ];
        });
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
            ? setActive(activeUiLayer.pseudolayer)
            : setActive(undefined);
    });

    return (
        <>
            <Container
                sx={{
                    backgroundColor: "red",
                    height: "100%",
                    textAlign: "center",
                }}
            >
                <Stack spacing={2} sx={{ height: "100%" }}>
                    <Typography variant="h4">Layers</Typography>
                    {uiLayers.map((uiLayer) => {
                        return (
                            <Layer
                                key={uiLayer.pseudolayer.uid}
                                uiLayer={uiLayer}
                                updateVisibility={updateVisibility}
                            />
                        );
                    })}
                    <Button onClick={addPseudolayer}>Add pseudolayer</Button>
                </Stack>
            </Container>
        </>
    );
};
