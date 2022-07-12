import { v4 as uuidv4 } from "uuid";

type LayerProperties = XyzProperties | OfflineProperties;

export interface XyzProperties {
  type: "XYZ";
  url: string;
}

export interface OfflineProperties {
  type: "offline";
  url: string;
}

export interface Layer {
  uid: string;
  type: "baseLayer";
  properties: LayerProperties;
}

export const generateLayer = (properties: LayerProperties): Layer => {
  return {
    uid: uuidv4(),
    type: "baseLayer",
    properties: properties,
  };
};
