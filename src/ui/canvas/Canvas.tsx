import React, { useContext, useEffect, useRef } from "react";
import * as twgl from "twgl.js";
import { RenderLoopContext } from "../../App";

export const Canvas = ({ className }: { className?: string }): JSX.Element => {
    const mapRef = useRef() as React.MutableRefObject<HTMLCanvasElement>;
    const renderLoop = useContext(RenderLoopContext);

    useEffect(() => {
        const gl = twgl.getContext(mapRef.current);
        renderLoop.registerWebGl(gl);
    });

    return (
        <div>
            <canvas ref={mapRef} className={className} />
        </div>
    );
};
