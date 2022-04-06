import React from "react";
import { UiLayer } from "../ui/uiLayer";

export const GetActiveUiLayer = (
    uiLayers: UiLayer[]
): { activeUiLayer: UiLayer | undefined; activeIndex: number | undefined } => {
    const activeLayer = uiLayers.find((layer) => {
        return layer.visible;
    });
    if (activeLayer) {
        return {
            activeUiLayer: activeLayer,
            activeIndex: uiLayers.indexOf(activeLayer),
        };
    } else {
        return {
            activeUiLayer: undefined,
            activeIndex: undefined,
        };
    }
};
