import { v4 as uuidv4 } from "uuid";
import { Pseudolayer } from "./mapPanel/layers/pseudolayer";

export interface UiLayerConfig {
    name: string;
    pseudolayer: Pseudolayer;
}

export interface UiLayer {
    uid: string;
    visible: boolean;
    config: UiLayerConfig;
    updatedPseudolayer?: Pseudolayer;
}

export const generateUiLayer = (config: UiLayerConfig): UiLayer => {
    return {
        uid: uuidv4(),
        visible: true,
        config: config,
    };
};
