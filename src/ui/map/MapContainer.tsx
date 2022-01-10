import React from "react";
import View from "ol/View";
import { Pseudolayer } from "./layers/pseudolayer";
import { Box } from "@mui/material";
import { MapLayer } from "./MapLayer";

export const MapContainer = ({
    view,
    pseudolayer,
}: {
    view: View;
    pseudolayer: Pseudolayer | undefined;
}): JSX.Element => {
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
            {pseudolayer &&
                Object.values(pseudolayer.baseLayers).map((baseLayer) => {
                    return (
                        <MapLayer
                            key={baseLayer.uid}
                            view={view}
                            layer={baseLayer}
                        />
                    );
                })}
        </Box>
    );
};
