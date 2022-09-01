import { HorizontalStack } from "@/components/HorizontalStack";
import { VerticalStack } from "@/components/VerticalStack";
import { useUiLayerState } from "@/hooks/useUiLayerState";
import { AddLayer } from "@/ui/Sidebar/AddLayer";
import { AddLayerFromConfig } from "@/ui/Sidebar/AddLayerFromConfig";
import { Layer } from "@/ui/Sidebar/Layer";
import React, { ReactElement, useEffect } from "react";
import shallow from "zustand/shallow";

export const Sidebar = (): JSX.Element => {
  const { uiLayers, setUiLayers } = useUiLayerState(
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
            {/* <AddLayerFromConfig />
            <AddLayer /> */}
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
