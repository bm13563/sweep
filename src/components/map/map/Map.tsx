import React, { useRef, useState, useEffect } from "react";
import MapObject from "ol/Map";
import View from "ol/View";
import "./map.css";
import { Controls } from "../controls";
import { LayerConfig } from "../layers";

export interface MapProps {
    view: View;
    layer: LayerConfig;
    className?: string;
}

export interface RenderableLayers {
    uid: string;
    visible: boolean;
}

export const Map = ({ view, layer, className }: MapProps) => {
    const mapRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [map, setMap] = useState<MapObject>();

    useEffect(() => {
        map && map.addLayer(layer.layer);
    }, [layer, map]);

    useEffect(() => {
        const options = {
            view: view,
            layers: [],
            controls: [],
            overlays: []
        };
        const mapObject = new MapObject(options);
        mapObject.setTarget(mapRef.current);
        setMap(mapObject);
        return () => { mapObject.setTarget(undefined); };
    }, []);

    return (
        <div ref={mapRef} className={className}>
            <Controls/>
        </div>
    );
};