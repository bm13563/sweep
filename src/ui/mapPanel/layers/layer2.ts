import { v4 as uuidv4 } from "uuid";

type LayerConfig = XyzConfig;

interface XyzConfig {
    type: "XYZ";
    url: string;
}

export interface Layer2 {
    uid: string;
    type: "baseLayer";
    config: LayerConfig;
}

export const generateLayer2 = (config: LayerConfig): Layer2 => {
    return {
        uid: uuidv4(),
        type: "baseLayer",
        config: config,
    };
};
