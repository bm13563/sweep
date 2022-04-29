import { v4 as uuidv4 } from "uuid";
import { Pseudolayer } from "./mapPanel/layers/pseudolayer";
import update from "immutability-helper";

export interface UiLayerConfig {
    name: string;
    pseudolayer: Pseudolayer;
}

export interface UiLayer {
    uid: string;
    visible: boolean;
    config: UiLayerConfig;
    pendingPseudolayer?: Pseudolayer;
}

export const generateUiLayer = (config: UiLayerConfig): UiLayer => {
    return {
        uid: uuidv4(),
        visible: true,
        config: config,
    };
};

export const persistPendingPseudolayerAsUiLayer = (
    uiLayers: UiLayer[],
    activeIndex: number,
    pendingPseudolayer: Pseudolayer
): UiLayer[] => {
    return update(uiLayers, {
        [activeIndex]: {
            config: {
                pseudolayer: {
                    $set: pendingPseudolayer,
                },
            },
            pendingPseudolayer: {
                $set: undefined,
            },
        },
    });
};

export const discardPendingPseudolayer = (
    uiLayers: UiLayer[],
    activeIndex: number
): UiLayer[] => {
    return update(uiLayers, {
        [activeIndex]: {
            pendingPseudolayer: {
                $set: undefined,
            },
        },
    });
};

export const updatePendingPseudolayer = (
    uiLayers: UiLayer[],
    activeIndex: number,
    pseudolayer: Pseudolayer
): UiLayer[] => {
    return update(uiLayers, {
        [activeIndex]: {
            pendingPseudolayer: {
                $set: pseudolayer,
            },
        },
    });
};
