import React, { useContext, useEffect, useRef } from "react";
import * as twgl from "twgl.js";
import { RenderLoopContext } from "../../App";

export const Canvas = ({ className }: { className?: string }): JSX.Element => {
    const canvasRef = useRef() as React.MutableRefObject<HTMLCanvasElement>;
    const renderLoop = useContext(RenderLoopContext);

    useEffect(() => {
        const gl = twgl.getContext(canvasRef.current);
        console.log(gl.canvas.height, gl.canvas.width);
        renderLoop.registerWebGl(gl);
    });

    return (
        <div>
            <canvas ref={canvasRef} className={className} />
        </div>
    );
};
