import React, { useContext, useEffect, useRef } from "react";
import { RenderLoopContext } from "../../App";
import { Layer } from "../../primitives/baseLayer";

export const OfflineCanvas = ({ layer }: { layer: Layer }) => {
  const renderLoop = useContext(RenderLoopContext);

  const imageRef = useRef() as React.MutableRefObject<HTMLImageElement>;
  const canvasRef = useRef() as React.MutableRefObject<HTMLCanvasElement>;

  useEffect(() => {
    const processImage = () => {
      if (canvasRef.current && imageRef.current) {
        const canvas = canvasRef.current;
        canvas
          .getContext("2d")
          ?.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
        setTimeout(
          () =>
            requestAnimationFrame(() => {
              processImage();
            }),
          1000
        );
      }
    };
    processImage();
  });

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    if (context) {
      renderLoop.registerContext({
        [layer.uid]: context,
      });
    }
  });

  return (
    <>
      <img
        src={layer.properties.url}
        ref={imageRef}
        className="display-none"
      ></img>
      <canvas
        ref={canvasRef}
        className="absolute h-full w-full opacity-0 z-1"
      ></canvas>
    </>
  );
};
