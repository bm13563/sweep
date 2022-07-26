import React, { ReactElement, useEffect } from "react";
import { Layer } from "./Layer";
import { AddLayer } from "./AddLayer";
import { AddLayerFromConfig } from "./AddLayerFromConfig";
import { VerticalStack } from "../../components/VerticalStack";
import { HorizontalStack } from "../../components/HorizontalStack";
import { useHandleUiLayerState } from "../../hooks/useHandleUiLayerState";
import shallow from "zustand/shallow";

export const Sidebar = (): JSX.Element => {
  const { uiLayers, setUiLayers } = useHandleUiLayerState(
    (state) => ({
      uiLayers: state.uiLayers,
      setUiLayers: state.setUiLayers,
    }),
    shallow
  );

  useEffect(() => {
    setUiLayers(uiLayers);
  }, [uiLayers]);

  return (
    <div className="w-full">
      <VerticalStack spacing={2}>
        <HorizontalStack className="justify-between">
          <div className="header1">Layers</div>
          <HorizontalStack spacing={2}>
            <AddLayerFromConfig />
            <AddLayer />
          </HorizontalStack>
        </HorizontalStack>
        {
          uiLayers.map((uiLayer, index) => {
            return <Layer key={uiLayer.uid} uiLayer={uiLayer} index={index} />;
          }) as unknown as ReactElement
        }
      </VerticalStack>
    </div>
  );
};
