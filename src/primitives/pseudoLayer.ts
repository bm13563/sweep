import { v4 as uuidv4 } from "uuid";
import { Layer } from "./baseLayer";

export interface ShaderProps {
  vertexShader: string;
  fragmentShader: string;
}

export interface PseudolayerProperties {
  inputs: Record<string, Layer | PseudoLayer>;
  variables: Record<string, string | string[]>;
  dynamics: Record<string, string>;
  shaders: ShaderProps;
}

export interface PseudoLayer {
  uid: string;
  type: "pseudolayer";
  properties: PseudolayerProperties;
}

export const generatePseudoLayer = (
  properties: PseudolayerProperties
): PseudoLayer => {
  return {
    uid: uuidv4(),
    type: "pseudolayer",
    properties: properties,
  };
};
