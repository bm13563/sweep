import { View } from "ol";
import { fromLonLat, get as getProjection } from "ol/proj";
import { Layer } from "../primitives/baseLayer";
import { PseudoLayer } from "../primitives/pseudoLayer";

export const isPseudolayer = (
    layer: Layer | PseudoLayer
): layer is PseudoLayer => {
    return layer.type === "pseudolayer";
};

export const isBaseLayer = (layer: Layer | PseudoLayer): layer is Layer => {
    return layer.type === "baseLayer";
};

export const findMapLayers = (
    pseudolayer: PseudoLayer | undefined
): Layer[] => {
    const mapLayers: Layer[] = [];

    const recurse = (layer: PseudoLayer | Layer): void => {
        if (isBaseLayer(layer)) {
            mapLayers.push(layer);
        } else if (isPseudolayer(layer)) {
            for (const key in layer.config.inputs) {
                recurse(layer.config.inputs[key]);
            }
        }
    };

    pseudolayer && recurse(pseudolayer);
    return mapLayers;
};

export const defaultView = (): View => {
    const projection = getProjection("EPSG:3857");
    return new View({
        center: fromLonLat([-94.9065, 38.9884]),
        zoom: 9,
        projection: projection,
    });
};
