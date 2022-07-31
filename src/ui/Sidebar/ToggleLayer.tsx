import React from "react";
import { Icon } from "../../components/Icon";
import { UiLayer } from "../../primitives/uiLayer";
import shallow from "zustand/shallow";
import { useHandleUiLayerState } from "../../hooks/useHandleUiLayerState";
import update from "immutability-helper";

export const ToggleLayer = ({ uiLayer }: { uiLayer: UiLayer }): JSX.Element => {
  const { uiLayers, setUiLayers } = useHandleUiLayerState(
    (state) => ({
      uiLayers: state.uiLayers,
      setUiLayers: state.setUiLayers,
    }),
    shallow
  );

  const updateVisibility = () => {
    const indexToUpdate = uiLayers.indexOf(uiLayer);
    setUiLayers(
      update(uiLayers, {
        [indexToUpdate]: {
          visible: {
            $apply: function (visible) {
              return !visible;
            },
          },
        },
      })
    );
  };

  return (
    <>
      {uiLayer.visible ? (
        <Icon
          className="i-mdi-eye-off"
          title="Hide layer"
          onClick={updateVisibility}
        />
      ) : (
        <Icon
          className="i-mdi-eye bg-blues-text-accent"
          title="Show layer"
          onClick={updateVisibility}
        />
      )}
    </>
  );
};
