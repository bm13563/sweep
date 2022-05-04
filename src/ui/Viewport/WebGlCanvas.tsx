import React, { useContext, useEffect, useRef } from "react";
import * as twgl from "twgl.js";
import { RenderLoopContext } from "../../App";

export const WebGlCanvas = (): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(
        null
    ) as React.MutableRefObject<HTMLCanvasElement>;
    const renderLoop = useContext(RenderLoopContext);

    useEffect(() => {
        const gl = twgl.getContext(canvasRef.current);
        renderLoop.registerWebGl(gl);
    });

    return (
        <div className="relative top-0 h-full w-full z-0">
            <canvas ref={canvasRef} className="h-full w-full" />
        </div>
    );
};
