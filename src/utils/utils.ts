import { View } from "ol";
import OSM from "ol/source/OSM";
import { fromLonLat, get as getProjection } from "ol/proj";
import { BaseLayer } from "../ui/map/layers/baseLayer";
import { Pseudolayer } from "../ui/map/layers/pseudolayer";
import { TileBaseLayer } from "../ui/map/layers/tileLayer";
import { baseFragment } from "../webgl/shaders/base.fragment";
import { baseVertex } from "../webgl/shaders/base.vertex";
import { blueFragment } from "../webgl/shaders/blue.fragment";

export const isPseudolayer = (
    layer: BaseLayer | Pseudolayer
): layer is Pseudolayer => {
    return layer.type === "pseudolayer";
};

export const isBaseLayer = (
    layer: BaseLayer | Pseudolayer
): layer is BaseLayer => {
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
    const defaultTileLayer = new TileBaseLayer({
        source: new OSM(),
        zIndex: 0,
    });
    const defaultPseudolayer = new Pseudolayer(
        { u_image: defaultTileLayer },
        {},
        { vertexShader: baseVertex, fragmentShader: baseFragment }
    );
    return defaultPseudolayer;
};

export const flippedPseudolayer = (): Pseudolayer => {
    const defaultTileLayer = new TileBaseLayer({
        source: new OSM(),
        zIndex: 0,
    });
    const flippedPseudolayer = new Pseudolayer(
        { u_image: defaultTileLayer },
        {},
        { vertexShader: baseVertex, fragmentShader: blueFragment }
    );
    return flippedPseudolayer;
};
