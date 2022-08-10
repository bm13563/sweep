import { UiLayer } from "@/primitives/uiLayer";
import { OfflineCanvas } from "@/ui/Viewport/OfflineCanvas";
import { OpenlayersCanvas } from "@/ui/Viewport/OpenlayersCanvas";
import { WebGlCanvas } from "@/ui/Viewport/WebGlCanvas";
import { findMapLayers } from "@/utils/utils";
import View from "ol/View";
import React from "react";

export const Viewport = ({
  view,
  activeUiLayer,
}: {
  view: View;
  activeUiLayer: UiLayer | undefined;
}): JSX.Element => {
  const mapLayers = findMapLayers(activeUiLayer?.properties.pseudolayer);

  return (
    <div className="relative top-0 w-full h-full m-0">
      {mapLayers.map((layer) => {
        return layer.properties.type === "offline" ? (
          <OfflineCanvas key={layer.uid} layer={layer} />
        ) : (
          <OpenlayersCanvas key={layer.uid} view={view} layer={layer} />
        );
      })}
      <WebGlCanvas />
    </div>
  );
};
