import React, { useRef, useEffect, useState, useContext } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { Controls } from "./controls";
import { unByKey } from "ol/Observable";
import { Box } from "@mui/material";
import { Layer } from "./layers/layer";
import { XYZ } from "ol/source";
import OLTileLayer from "ol/layer/Tile";
import { get as getProjection } from "ol/proj";
import { RenderLoopContext } from "../../App";

type OlLayerTypes = OLTileLayer<XYZ>;

const generateOlLayerFromConfig = (layer: Layer): OlLayerTypes => {
    switch (layer.config.type) {
        case "XYZ": {
            return new OLTileLayer({
                source: new XYZ({
                    url: layer.config.url,
                    crossOrigin: "anonymous",
                    projection: getProjection("EPSG:3857"),
                    transition: 0,
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
    layer: Layer;
}): JSX.Element => {
    const renderLoop = useContext(RenderLoopContext);
    const mapRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const [olLayer, setOlLayer] = useState<OlLayerTypes>();

    useEffect(() => {
        if (!olLayer) {
            setOlLayer(generateOlLayerFromConfig(layer));
        }
    }, [layer]);

    useEffect(() => {
        if (!olLayer) return;

        const options = {
            view,
            layers: [olLayer],
            controls: [],
            overlays: [],
        };
        const mapObject = new Map(options);
        mapObject.setTarget(mapRef.current);

        return () => mapObject.setTarget(undefined);
    }, [olLayer]);

    useEffect(() => {
        if (!olLayer) return;

        const register = olLayer.once("postrender", (event) => {
            if (event.context) {
                renderLoop.registerContext({
                    [layer.uid]: event.context,
                });
            }
        });

        () => unByKey(register);
    }, [olLayer]);

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
