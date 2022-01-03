import React, { useContext, useState } from "react";
import GeoJSON from "ol/format/GeoJSON";
import { get } from "ol/proj";
import { Fill, Stroke, Style } from "ol/style";
import { OSM } from "ol/source";
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
import { defaultPseudolayer } from "../utils/utils";

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

const t1 = new Pseudolayer(
    { u_image: tileTest },
    {},
    { vertexShader: baseVertex, fragmentShader: baseFragment }
);

const t2 = new Pseudolayer(
    { u_image: vectorTest },
    {},
    { vertexShader: baseVertex, fragmentShader: baseFragment }
);

const t3 = new Pseudolayer(
    { u_image: t2 },
    {},
    { vertexShader: flipVertex, fragmentShader: baseFragment }
);

const t4 = new Pseudolayer(
    { u_current_image: t3, u_previous_image: t1 },
    {},
    { vertexShader: baseVertex, fragmentShader: mergeFragment }
);

export const PageContainer = (): JSX.Element => {
    const renderLoop = useContext(RenderLoopContext);

    const [pseudolayer, setPseudolayer] = useState(defaultPseudolayer());

    renderLoop.renderPseudolayer(pseudolayer);

    return (
        <>
            <PositionedMap pseudolayer={pseudolayer} />
        </>
    );
};
