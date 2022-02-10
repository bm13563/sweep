import { v4 as uuidv4 } from "uuid";
import { Layer } from "./layer";

interface ShaderProps {
    vertexShader: string;
    fragmentShader: string;
}

interface PseudolayerConfig {
    inputs: Record<string, Layer | Pseudolayer>;
    variables: Record<string, string>;
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
