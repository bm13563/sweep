import { v4 as uuidv4 } from "uuid";
import { Layer } from "@/primitives/baseLayer";

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

export interface PseudolayerMetadata {
  description: string;
  band1: string;
  band2: string;
  band3: string;
  band4: string;
}

export interface PseudoLayer {
  uid: string;
  type: "pseudolayer";
  properties: PseudolayerProperties;
  metadata: PseudolayerMetadata;
}

export const defaultMetadata = {
  description: "",
  band1: "red",
  band2: "green",
  band3: "blue",
  band4: "alpha",
};

export const generatePseudoLayer = (
  properties: PseudolayerProperties
): PseudoLayer => {
  return {
    uid: uuidv4(),
    type: "pseudolayer",
    properties: properties,
    metadata: defaultMetadata,
  };
};
