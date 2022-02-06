import { v4 as uuidv4 } from "uuid";
import { Pseudolayer2 } from "./mapPanel/layers/pseudolayer2";

interface UiLayerConfig {
    name: string;
    pseudolayer: Pseudolayer2;
}

export interface UiLayer {
    uid: string;
    visible: boolean;
    config: UiLayerConfig;
    updatedPseudolayer?: Pseudolayer2;
}

export const generateUiLayer = (config: UiLayerConfig): UiLayer => {
    return {
        uid: uuidv4(),
        visible: true,
        config: config,
    };
};

export const getActiveUiLayer = (
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
