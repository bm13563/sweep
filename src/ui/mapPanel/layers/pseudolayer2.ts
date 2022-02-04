import { v4 as uuidv4 } from "uuid";
import { Layer2 } from "./layer2";

interface ShaderProps {
    vertexShader: string;
    fragmentShader: string;
}

interface PseudolayerConfig2 {
    inputs: Record<string, Layer2 | Pseudolayer2>;
    variables: Record<string, string>;
    shaders: ShaderProps;
}

export interface Pseudolayer2 {
    uid: string;
    type: "pseudolayer";
    config: PseudolayerConfig2;
}

export const generatePseudolayer2 = (
    config: PseudolayerConfig2
): Pseudolayer2 => {
    return {
        uid: uuidv4(),
        type: "pseudolayer",
        config: config,
    };
};
