import { v4 as uuidv4 } from "uuid";
import { Layer } from "./baseLayer";

export interface ShaderProps {
    vertexShader: string;
    fragmentShader: string;
}

export interface PseudoLayerConfig {
    inputs: Record<string, Layer | PseudoLayer>;
    variables: Record<string, string>;
    dynamics: Record<string, string>;
    shaders: ShaderProps;
}

export interface PseudoLayer {
    uid: string;
    type: "pseudolayer";
    config: PseudoLayerConfig;
}

export const generatePseudoLayer = (config: PseudoLayerConfig): PseudoLayer => {
    return {
        uid: uuidv4(),
        type: "pseudolayer",
        config: config,
    };
};
