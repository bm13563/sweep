import { v4 as uuidv4 } from "uuid";
import { Layer } from "./layer";

export interface ShaderProps {
    vertexShader: string;
    fragmentShader: string;
}

export interface PseudolayerConfig {
    inputs: Record<string, Layer | Pseudolayer>;
    variables: Record<string, string>;
    dynamics: Record<string, string>;
    shaders: ShaderProps;
}

export interface Pseudolayer {
    uid: string;
    type: "pseudolayer";
    config: PseudolayerConfig;
}

export const generatePseudolayer = (config: PseudolayerConfig): Pseudolayer => {
    return {
        uid: uuidv4(),
        type: "pseudolayer",
        config: config,
    };
};
