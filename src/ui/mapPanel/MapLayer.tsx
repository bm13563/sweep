import React, { useRef, useEffect, useState, useContext } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { Controls } from "./controls";
import { unByKey } from "ol/Observable";
import { Box } from "@mui/material";
import { Layer2 } from "./layers/layer2";
import { XYZ } from "ol/source";
import OLTileLayer from "ol/layer/Tile";
import { get as getProjection } from "ol/proj";
import { RenderLoopContext } from "../../App";

type OlLayerTypes = OLTileLayer<XYZ>;

const generateOlLayerFromConfig = (layer: Layer2): OlLayerTypes => {
    switch (layer.config.type) {
        case "XYZ": {
            return new OLTileLayer({
                source: new XYZ({
                    url: layer.config.url,
                    crossOrigin: "anonymous",
                    projection: getProjection("EPSG:3857"),
                }),
                zIndex: 0,
            });
        }
    }
};

export const MapLayer = ({
    view,
    layer,
}: {
    view: View;
    layer: Layer2;
}): JSX.Element => {
    const renderLoop = useContext(RenderLoopContext);
    const mapRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const [olLayer] = useState<OlLayerTypes>(generateOlLayerFromConfig(layer));

    useEffect(() => {
        const options = {
            view,
            layers: [olLayer],
            controls: [],
            overlays: [],
        };
        const mapObject = new Map(options);
        mapObject.setTarget(mapRef.current);

        return () => mapObject.setTarget(undefined);
    });

    useEffect(() => {
        const register = olLayer.once("postrender", (event) => {
            if (event.context) {
                renderLoop.registerContext({
                    [layer.uid]: event.context,
                });
            }
        });

        () => unByKey(register);
    });

    return (
        <Box
            sx={{
                position: "absolute",
                height: "100%",
                width: "100%",
                opacity: 0,
            }}
            ref={mapRef}
        >
            <Controls />
        </Box>
    );
};
