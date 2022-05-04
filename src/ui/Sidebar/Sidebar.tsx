import React, { ReactElement, useEffect } from "react";
import { Layer } from "./Layer";
import { AddLayer } from "./AddLayer";
import { AddLayerFromConfig } from "./AddLayerFromConfig";
import { Header1 } from "../../components/Typography";
import { VerticalStack } from "../../components/VerticalStack";
import { HorizontalStack } from "../../components/HorizontalStack";
import { useHandleUiState } from "../../hooks/useHandleUiState";
import { useHandleUiLayerState } from "../../hooks/useHandleUiLayerState";
import shallow from "zustand/shallow";

export const LayerContainer = (): JSX.Element => {
    const isDisplayed = useHandleUiState((state) => state.component);
    const { uiLayers, setUiLayers } = useHandleUiLayerState(
        (state) => ({
            uiLayers: state.uiLayers,
            setUiLayers: state.setUiLayers,
        }),
        shallow
    );

    useEffect(() => {
        setUiLayers(uiLayers);
    }, [uiLayers]);

    return (
        <div
            className={`h-full w-5/6 ${!!isDisplayed && "pointer-events-none"}`}
        >
            <VerticalStack spacing={5}>
                <HorizontalStack spacing={5} className="justify-between">
                    <Header1>Layers</Header1>
                    <HorizontalStack spacing={2}>
                        <AddLayerFromConfig />
                        <AddLayer />
                    </HorizontalStack>
                </HorizontalStack>
                {
                    uiLayers.map((uiLayer, index) => {
                        return (
                            <Layer
                                key={uiLayer.uid}
                                uiLayer={uiLayer}
                                index={index}
                            />
                        );
                    }) as unknown as ReactElement
                }
            </VerticalStack>
        </div>
    );
};
