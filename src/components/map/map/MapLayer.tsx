import React, { useRef, useEffect, useContext } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { Controls } from "../controls";
import { LayerConfig } from "../layers";
import { RenderLoopContext } from "../../../App";
import { unByKey } from "ol/Observable";

export interface MapProps {
    view: View;
    layer: LayerConfig;
    className?: string;
}

export const MapLayer = ({ view, layer, className }: MapProps): JSX.Element => {
    const mapRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const renderLoop = useContext(RenderLoopContext);

    useEffect(() => {
        const options = {
            view,
            layers: [layer.layer],
            controls: [],
            overlays: [],
        };
        const mapObject = new Map(options);
        mapObject.setTarget(mapRef.current);

        return () => mapObject.setTarget(undefined);
    }, [layer]);

    useEffect(() => {
        const register = layer.layer.once("postrender", (event) => {
            if (event.context) event.context.canvas.id = `${layer.uid}`;
            event.context && renderLoop.registerCanvas(event.context);
        });

        () => unByKey(register);
    }, [layer]);

    return (
        <div ref={mapRef} className={className}>
            <Controls />
        </div>
    );
};
