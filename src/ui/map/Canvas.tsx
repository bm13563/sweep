import { Box } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import * as twgl from "twgl.js";
import { RenderLoopContext } from "../../App";
import styled from "styled-components";

const ExpandingCanvas = styled.canvas`
    height: 100%;
    width: 100%;
`;

export const Canvas = (): JSX.Element => {
    const canvasRef = useRef() as React.MutableRefObject<HTMLCanvasElement>;
    const renderLoop = useContext(RenderLoopContext);

    useEffect(() => {
        const gl = twgl.getContext(canvasRef.current);
        renderLoop.registerWebGl(gl);
    });

    return (
        <Box
            sx={{
                position: "relative",
                top: "0px",
                height: "100%",
                width: "100%",
                margin: "0px",
                marginLeft: "-100%",
                zIndex: 0,
            }}
        >
            <ExpandingCanvas ref={canvasRef} />
        </Box>
    );
};
