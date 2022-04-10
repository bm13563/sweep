import React, { ReactElement, useEffect } from "react";
import { Layer } from "./Layer";
import { UiLayer } from "../uiLayer";
import { AddLayer } from "./AddLayer";
import { AddLayerFromConfig } from "./AddLayerFromConfig";
import { Header1 } from "../../components/Typography";
import { VerticalStack } from "../../components/VerticalStack";
import { HorizontalStack } from "../../components/HorizontalStack";
import { HandleUi } from "../../hooks/HandleUi";

export const LayerContainer = ({
    uiLayers,
    updateUiLayers,
}: {
    uiLayers: UiLayer[];
    updateUiLayers: (uiLayer: UiLayer[]) => void;
}): JSX.Element => {
    const isDisplayed = HandleUi((state) => state.isDisplayed);

    useEffect(() => {
        updateUiLayers(uiLayers);
    });

    return (
        <div
            className={`h-full w-5/6 ${isDisplayed() && "pointer-events-none"}`}
        >
            <VerticalStack spacing={5}>
                <HorizontalStack spacing={5} className="justify-between">
                    <Header1>Layers</Header1>
                    <HorizontalStack spacing={2}>
                        <AddLayerFromConfig
                            uiLayers={uiLayers}
                            updateUiLayers={updateUiLayers}
                        />
                        <AddLayer
                            uiLayers={uiLayers}
                            updateUiLayers={updateUiLayers}
                        />
                    </HorizontalStack>
                </HorizontalStack>
                {
                    uiLayers.map((uiLayer, index) => {
                        return (
                            <Layer
                                key={uiLayer.uid}
                                uiLayer={uiLayer}
                                uiLayers={uiLayers}
                                updateUiLayers={updateUiLayers}
                                index={index}
                            />
                        );
                    }) as unknown as ReactElement
                }
            </VerticalStack>
        </div>
    );
};
