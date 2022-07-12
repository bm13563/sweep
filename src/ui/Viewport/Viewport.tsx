import View from "ol/View";
import React from "react";
import { UiLayer } from "../../primitives/uiLayer";
import { findMapLayers } from "../../utils/utils";
import { OpenlayersCanvas } from "./OpenlayersCanvas";
import { OfflineCanvas } from "./OfflineCanvas";
import { WebGlCanvas } from "./WebGlCanvas";

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
