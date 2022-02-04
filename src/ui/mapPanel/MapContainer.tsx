import React from "react";
import View from "ol/View";
import { Box } from "@mui/material";
import { MapLayer } from "./MapLayer";
import { getActiveUiLayer, UiLayer } from "../uiLayer";
import { findMapLayers } from "../../utils/utils";

export const MapContainer = ({
    view,
    uiLayers,
}: {
    view: View;
    uiLayers: UiLayer[];
}): JSX.Element => {
    const { activeUiLayer } = getActiveUiLayer(uiLayers);
    const mapLayers = findMapLayers(activeUiLayer?.config.pseudolayer);

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
            {mapLayers &&
                mapLayers.map((layer) => {
                    return (
                        <MapLayer key={layer.uid} view={view} layer={layer} />
                    );
                })}
        </Box>
    );
};
