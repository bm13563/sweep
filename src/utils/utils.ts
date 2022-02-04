import { View } from "ol";
import { fromLonLat, get as getProjection } from "ol/proj";
import { Layers } from "../ui/mapPanel/layers/layer";
import { Layer2 } from "../ui/mapPanel/layers/layer2";
import { Pseudolayer } from "../ui/mapPanel/layers/pseudolayer";
import { Pseudolayer2 } from "../ui/mapPanel/layers/pseudolayer2";

export const isPseudolayer = (
    layer: Layers | Pseudolayer
): layer is Pseudolayer => {
    return layer.type === "pseudolayer";
};

export const isBaseLayer = (layer: Layers | Pseudolayer): layer is Layers => {
    return layer.type === "baseLayer";
};

export const isPseudolayer2 = (
    layer: Layer2 | Pseudolayer2
): layer is Pseudolayer2 => {
    return layer.type === "pseudolayer";
};

export const isBaseLayer2 = (layer: Layer2 | Pseudolayer2): layer is Layer2 => {
    return layer.type === "baseLayer";
};

export const findMapLayers = (
    pseudolayer: Pseudolayer2 | undefined
): Layer2[] => {
    const mapLayers: Layer2[] = [];

    const recurse = (layer: Pseudolayer2 | Layer2): void => {
        if (isBaseLayer2(layer)) {
            mapLayers.push(layer);
        } else if (isPseudolayer2(layer)) {
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
