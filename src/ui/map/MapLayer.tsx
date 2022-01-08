import React, { useRef, useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { Controls } from "./controls";
import { unByKey } from "ol/Observable";
import { BaseLayer } from "./layers/baseLayer";

export const MapLayer = ({
    view,
    layer,
    className,
}: {
    view: View;
    layer: BaseLayer;
    className?: string;
}): JSX.Element => {
    const mapRef = useRef() as React.MutableRefObject<HTMLInputElement>;

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
    }, [layer.layer]);

    useEffect(() => {
        const register = layer.layer.once("postrender", (event) => {
            if (event.context) {
                layer.registerContext(event.context);
            }
        });

        () => unByKey(register);
    }, [layer.layer]);

    return (
        <div ref={mapRef} className={className}>
            <Controls />
        </div>
    );
};
