import ImageLayer from "ol/layer/Image";
import OLTileLayer from "ol/layer/Tile";
import Map from "ol/Map";
import { unByKey } from "ol/Observable";
import { get as getProjection } from "ol/proj";
import { XYZ } from "ol/source";
import Static from "ol/source/ImageStatic";
import View from "ol/View";
import React, { useContext, useEffect, useRef, useState } from "react";
import { RenderLoopContext } from "../../App";
import { Layer } from "../../primitives/baseLayer";

type OlLayerTypes = OLTileLayer<XYZ> | ImageLayer<Static>;

export const OpenlayersCanvas = ({
  view,
  layer,
}: {
  view: View;
  layer: Layer;
}): JSX.Element => {
  const renderLoop = useContext(RenderLoopContext);
  const mapRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [olLayer, setOlLayer] = useState<OlLayerTypes>();
  // remount entire layer whenever we detect that canvas size has
  // changed to keep correct aspect ratio
  const [canvasResize, setCanvasResize] = useState(0);

  const generateOlLayerFromConfig = () => {
    switch (layer.properties.type) {
      case "XYZ": {
        return new OLTileLayer({
          source: new XYZ({
            url: layer.properties.url,
            crossOrigin: "anonymous",
            projection: getProjection("EPSG:3857"),
            transition: 0,
          }),
          zIndex: 0,
        });
      }
    }
  };

  useEffect(() => {
    if (!olLayer) {
      setOlLayer(generateOlLayerFromConfig());
    }
  }, [layer, canvasResize]);

  useEffect(() => {
    if (!olLayer) return;

    const options = {
      view,
      layers: [olLayer],
      overlays: [],
    };
    const mapObject = new Map(options);
    mapObject.setTarget(mapRef.current);

    return () => mapObject.setTarget(undefined);
  }, [olLayer, canvasResize]);

  useEffect(() => {
    if (!olLayer) return;

    const register = olLayer.once("postrender", (event) => {
      if (event.context) {
        renderLoop.registerContext({
          [layer.uid]: event.context,
        });
      }
    });

    () => unByKey(register);
  }, [olLayer, canvasResize]);

  useEffect(() => {
    if (!mapRef.current) return;

    const startWidth = mapRef.current.clientWidth;
    const startHeight = mapRef.current.clientHeight;
    const observer = new ResizeObserver((e) => {
      const newDimensions = e[0].contentRect;
      if (
        newDimensions.width !== startWidth ||
        newDimensions.height !== startHeight
      ) {
        setCanvasResize(canvasResize + 1);
      }
    });
    observer.observe(mapRef.current);

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current);
        observer.disconnect();
      } else {
        observer.disconnect();
      }
    };
  }, [olLayer, canvasResize]);

  return <div ref={mapRef} className="absolute h-full w-full opacity-0 z-1" />;
};
