import React, { useContext, useEffect, useRef } from "react";
import * as twgl from "twgl.js";
import { RenderLoopContext } from "../../App";

export const Canvas = ({ className }: { className?: string }): JSX.Element => {
    const canvasRef = useRef() as React.MutableRefObject<HTMLCanvasElement>;
    const renderLoop = useContext(RenderLoopContext);

    useEffect(() => {
        const gl = twgl.getContext(canvasRef.current);
        renderLoop.registerWebGl(gl);
    });

    return (
        <>
            <canvas ref={canvasRef} className={className} />
        </>
    );
};
