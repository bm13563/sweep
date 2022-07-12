import { v4 as uuidv4 } from "uuid";
import { PseudoLayer } from "./pseudoLayer";
import update from "immutability-helper";

export interface UiLayerProperties {
  name: string;
  pseudolayer: PseudoLayer;
}

export interface UiLayer {
  uid: string;
  visible: boolean;
  properties: UiLayerProperties;
  pendingPseudolayer?: PseudoLayer;
}

export const generateUiLayer = (properties: UiLayerProperties): UiLayer => {
  return {
    uid: uuidv4(),
    visible: true,
    properties: properties,
  };
};

export const persistPendingPseudolayerAsUiLayer = (
  uiLayers: UiLayer[],
  activeIndex: number,
  pendingPseudolayer: PseudoLayer
): UiLayer[] => {
  return update(uiLayers, {
    [activeIndex]: {
      properties: {
        pseudolayer: {
          $set: pendingPseudolayer,
        },
      },
      pendingPseudolayer: {
        $set: undefined,
      },
    },
  });
};

export const discardPendingPseudolayer = (
  uiLayers: UiLayer[],
  activeIndex: number
): UiLayer[] => {
  return update(uiLayers, {
    [activeIndex]: {
      pendingPseudolayer: {
        $set: undefined,
      },
    },
  });
};

export const updatePendingPseudolayer = (
  uiLayers: UiLayer[],
  activeIndex: number,
  pseudolayer: PseudoLayer
): UiLayer[] => {
  return update(uiLayers, {
    [activeIndex]: {
      pendingPseudolayer: {
        $set: pseudolayer,
      },
    },
  });
};
