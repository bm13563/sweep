import GeoJSON from "ol/format/GeoJSON";
import React, { useState } from "react";
import { fromLonLat, get } from "ol/proj";
import { Fill, Stroke, Style } from "ol/style";
import { OSM } from "ol/source";
import View from "ol/View";
import vectorData from "../../data/vector.json";
import { createTileLayer, createVectorLayer } from "../map/layers";
import { PositionedCanvas, PositionedMap } from "./position.styles";
import { vector } from "../map/layers/source/vector";

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

const vectorTest = createVectorLayer(test);

const test2 = {
  source: new OSM(),
  zIndex: 0,
};

const tileTest = createTileLayer(test2);

export function MapArea({ className }: { className?: string }) {
  const mapView = new View({
    zoom: 9,
    center: fromLonLat([-94.9065, 38.9884]),
  });
  const [canvasGl, setCanvasGl] = useState<WebGLRenderingContext>();

  const initGl = (gl: WebGLRenderingContext) => {
    setCanvasGl(gl);
  };

  return (
    <div className={className}>
      {canvasGl && (
        <>
          <PositionedMap view={mapView} layer={tileTest} />
          <PositionedMap view={mapView} layer={vectorTest} />
        </>
      )}
      <PositionedCanvas initGl={initGl} />
    </div>
  );
}
