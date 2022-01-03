import React, { useContext } from "react";
import GeoJSON from "ol/format/GeoJSON";
import { fromLonLat, get } from "ol/proj";
import { Fill, Stroke, Style } from "ol/style";
import { OSM } from "ol/source";
import View from "ol/View";
import vectorData from "../data/vector.json";
import { PositionedMap } from "./position.styles";
import { flipVertex } from "../webgl/shaders/flip.vertex";
import { baseFragment } from "../webgl/shaders/base.fragment";
import { vector } from "./map/layers/source";
import { RenderLoopContext } from "../App";
import { VectorBaseLayer } from "./map/layers/vectorLayer";
import { TileBaseLayer } from "./map/layers/tileLayer";
import { Pseudolayer } from "./map/layers/pseudolayer";
import { baseVertex } from "../webgl/shaders/base.vertex";
import { mergeFragment } from "../webgl/shaders/merge.fragment";

const styles = {
    MultiPolygon: new Style({
        stroke: new Stroke({
            color: "blue",
            width: 1,
        }),
        fill: new Fill({
            color: "rgba(0, 0, 255, 0.1)",
        }),
    }),
};

const { geojsonObject } = vectorData;

const test = {
    source: vector(
        new GeoJSON().readFeatures(geojsonObject, {
            featureProjection: get("EPSG:3857"),
        })
    ),
    style: styles.MultiPolygon,
    zIndex: 1,
};

const vectorTest = new VectorBaseLayer(test);

const test2 = {
    source: new OSM(),
    zIndex: 0,
};

const tileTest = new TileBaseLayer(test2);

const mapView = new View({
    zoom: 9,
    center: fromLonLat([-94.9065, 38.9884]),
});

export const PageContainer = (): JSX.Element => {
    const renderLoop = useContext(RenderLoopContext);

    const test = new Pseudolayer(
        { u_image: tileTest },
        {},
        { vertexShader: baseVertex, fragmentShader: baseFragment }
    );

    const test2 = new Pseudolayer(
        { u_image: vectorTest },
        {},
        { vertexShader: baseVertex, fragmentShader: baseFragment }
    );

    const test4 = new Pseudolayer(
        { u_image: test2 },
        {},
        { vertexShader: flipVertex, fragmentShader: baseFragment }
    );

    const test3 = new Pseudolayer(
        { u_current_image: test4, u_previous_image: test },
        {},
        { vertexShader: baseVertex, fragmentShader: mergeFragment }
    );

    renderLoop.renderPseudolayer(test3);

    return <PositionedMap view={mapView} layers={[tileTest, vectorTest]} />;
};
