import React from "react";
import shallow from "zustand/shallow";
import { Icon } from "../../components/Icon";
import { useHandleUiLayerState } from "../../hooks/useHandleUiLayerState";
import { UiLayer } from "../../primitives/uiLayer";
import update from "immutability-helper";

export const DeleteLayer = ({ uiLayer }: { uiLayer: UiLayer }): JSX.Element => {
  const { uiLayers, setUiLayers } = useHandleUiLayerState(
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
    <Icon className="i-mdi-delete text-text-primary" onClick={removeUiLayer} />
  );
};
