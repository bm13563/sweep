import React, { useEffect, useState } from "react";
import View from "ol/View";
import { Box } from "@mui/material";
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
    console.log("re-render");
    const mapLayers = findMapLayers(activeUiLayer?.config.pseudolayer);

    const [mapLayerUidState, setMapLayerUidState] = useState<string[]>([]);

    const mapLayerUids = mapLayers.map((mapLayer) => mapLayer.uid);

    const mapLayersAreTheSame = mapLayers
        .map((mapLayer) => mapLayerUidState.includes(mapLayer.uid))
        .every((mapLayer) => mapLayer === true);

    useEffect(() => {
        if (!mapLayersAreTheSame) {
            setMapLayerUidState(mapLayerUids);
        }
    });

    return (
        <Box
            sx={{
                position: "relative",
                top: "0px",
                height: "100%",
                width: "100%",
                margin: "0px",
                zIndex: 1,
            }}
        >
            {mapLayers.map((layer) => {
                return <MapLayer key={layer.uid} view={view} layer={layer} />;
            })}
        </Box>
    );
};
