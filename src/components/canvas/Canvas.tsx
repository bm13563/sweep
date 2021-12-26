import React, { useEffect, useRef } from "react";
import * as twgl from "twgl.js";

export const Canvas = ({
    initGl,
    className,
}: {
  initGl: (gl: WebGLRenderingContext) => void;
  className?: string;
}) => {
    const mapRef = useRef() as React.MutableRefObject<HTMLCanvasElement>;

    useEffect(() => {
        const gl = twgl.getContext(mapRef.current);
        initGl(gl);
        // height and width of the webgl canvas
        const width = gl.canvas.width;
        const height = gl.canvas.height;
        // base vertex shader, with position and texture quads. stored for use in other shader programs, as these only require fragment shader
        const baseVertexShader =
      "#version 300 es\r\n\r\nin vec2 position;\r\nin vec2 texcoord;\r\n\r\nout vec2 o_texCoord;\r\n\r\nvoid main() {\r\n   gl_Position = vec4(position, 0, 1);\r\n   o_texCoord = texcoord;\r\n}";
        const vs = baseVertexShader;
        // base fragment shader, for rendering a pseudolayer "as is"
        const baseFragmentShader =
      "#version 300 es\r\nprecision mediump float;\r\n\r\nin vec2 o_texCoord;\r\n\r\nuniform sampler2D f_image;\r\n\r\nout vec4 o_colour;\r\n\r\nvoid main() {\r\n   o_colour = texture(f_image, o_texCoord);\r\n}";
        const fs = baseFragmentShader;
        // the base program. pre-compiled as used for every pseudolayer
        const baseProgram = twgl.createProgramInfo(gl, [vs, fs]);
    });

    return (
        <div>
            <canvas ref={mapRef} className={className} />
        </div>
    );
};
