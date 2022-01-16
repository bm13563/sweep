import React, { useRef, useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { Controls } from "./controls";
import { unByKey } from "ol/Observable";
import { Layers } from "./layers/layer";
import { Box } from "@mui/material";

export const MapLayer = ({
    view,
    layer,
}: {
    view: View;
    layer: Layers;
}): JSX.Element => {
    const mapRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        const options = {
            view,
            layers: [layer.mapLayer],
            controls: [],
            overlays: [],
        };
        const mapObject = new Map(options);
        mapObject.setTarget(mapRef.current);

        return () => mapObject.setTarget(undefined);
    }, [layer.mapLayer]);

    useEffect(() => {
        const register = layer.mapLayer.once("postrender", (event) => {
            if (event.context) {
                layer.registerContext(event.context);
            }
        });

        () => unByKey(register);
    }, [layer.mapLayer]);

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
