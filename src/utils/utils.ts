import { View } from "ol";
import { fromLonLat, get as getProjection } from "ol/proj";
import { Layer } from "../ui/mapPanel/layers/layer";
import { Pseudolayer } from "../ui/mapPanel/layers/pseudolayer";

export const isPseudolayer = (
    layer: Layer | Pseudolayer
): layer is Pseudolayer => {
    return layer.type === "pseudolayer";
};

export const isBaseLayer = (layer: Layer | Pseudolayer): layer is Layer => {
    return layer.type === "baseLayer";
};

export const findMapLayers = (
    pseudolayer: Pseudolayer | undefined
): Layer[] => {
    const mapLayers: Layer[] = [];

    const recurse = (layer: Pseudolayer | Layer): void => {
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
