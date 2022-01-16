import { View } from "ol";
import { fromLonLat, get as getProjection } from "ol/proj";
import { Layers } from "../ui/map/layers/layer";
import {
    getDefaultPseudolayer,
    Pseudolayer,
} from "../ui/map/layers/pseudolayer";
import { XYZLayer } from "../ui/map/layers/xyzLayer";

export const isPseudolayer = (
    layer: Layers | Pseudolayer
): layer is Pseudolayer => {
    return layer.type === "pseudolayer";
};

export const isBaseLayer = (layer: Layers | Pseudolayer): layer is Layers => {
    return layer.type === "baseLayer";
};

export const defaultView = (): View => {
    const projection = getProjection("EPSG:3857");
    return new View({
        center: fromLonLat([-94.9065, 38.9884]),
        zoom: 9,
        projection: projection,
    });
};

export const defaultPseudolayer = (): Pseudolayer => {
    const defaultTileLayer = new XYZLayer({
        source: {
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        },
    });
    return getDefaultPseudolayer(defaultTileLayer);
};
