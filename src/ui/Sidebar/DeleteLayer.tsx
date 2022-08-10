import { Icon } from "@/components/Icon";
import { useUiLayerState } from "@/hooks/useUiLayerState";
import { UiLayer } from "@/primitives/uiLayer";
import update from "immutability-helper";
import React from "react";
import shallow from "zustand/shallow";

export const DeleteLayer = ({ uiLayer }: { uiLayer: UiLayer }): JSX.Element => {
  const { uiLayers, setUiLayers } = useUiLayerState(
    (state) => ({
      uiLayers: state.uiLayers,
      setUiLayers: state.setUiLayers,
    }),
    shallow
  );

  const removeUiLayer = () => {
    const indexToRemove = uiLayers.indexOf(uiLayer);
    setUiLayers(
      update(uiLayers, {
        $splice: [[indexToRemove, 1]],
      })
    );
  };
  return (
    <Icon
      title="Delete layer"
      className="i-mdi-delete"
      onClick={removeUiLayer}
    />
  );
};
