import React from "react";
import View from "ol/View";
import { MapLayer } from "./MapLayer";
import { UiLayer } from "../uiLayer";
import { findMapLayers } from "../../utils/utils";

export const MapContainer = ({
    view,
    activeUiLayer,
}: {
    view: View;
    activeUiLayer: UiLayer | undefined;
}): JSX.Element => {
    const mapLayers = findMapLayers(activeUiLayer?.config.pseudolayer);

    return (
        <div className="relative top-0 w-full h-full m-0 z-1">
            {mapLayers.map((layer) => {
                return <MapLayer key={layer.uid} view={view} layer={layer} />;
            })}
        </div>
    );
};
