import { v4 as uuidv4 } from "uuid";

type LayerConfig = XyzConfig;

interface XyzConfig {
    type: "XYZ";
    url: string;
}

export interface Layer {
    uid: string;
    type: "baseLayer";
    config: LayerConfig;
}

export const generateLayer = (config: LayerConfig): Layer => {
    return {
        uid: uuidv4(),
        type: "baseLayer",
        config: config,
    };
};
