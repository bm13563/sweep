import React, { useContext, useState } from "react";
import { RenderLoopContext } from "../App";
import { Grid } from "@mui/material";
import { LayerContainer } from "./leftPanel/LayerContainer";
import { MapContainer } from "./mapPanel/MapContainer";
import { Canvas } from "./mapPanel/Canvas";
import { ActionContainer } from "./actionPanel/ActionContainer";
import { defaultView } from "../utils/utils";
import { ActionStateProvider } from "./actionPanel/ActionContext";
import { ToolbarContainer } from "./topPanel/ToolbarContainer";
import { generateLayer } from "./mapPanel/layers/layer";
import { generatePseudolayer } from "./mapPanel/layers/pseudolayer";
import { baseVertex } from "../webgl/shaders/base.vertex";
import { baseFragment } from "../webgl/shaders/base.fragment";
import { generateUiLayer, getActiveUiLayer, UiLayer } from "./uiLayer";
import { blueFragment } from "../webgl/shaders/blue.fragment";
import { colors } from "../themes";

const view = defaultView();

const newLayer2 = generateLayer({
    type: "XYZ",
    url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
});

const newPseudolayer2 = generatePseudolayer({
    inputs: { u_image: newLayer2 },
    variables: {},
    shaders: { vertexShader: baseVertex, fragmentShader: baseFragment },
});

const newPseudolayer3 = generatePseudolayer({
    inputs: { u_image: newPseudolayer2 },
    variables: {},
    shaders: { vertexShader: baseVertex, fragmentShader: blueFragment },
});

const newUiLayer = generateUiLayer({
    name: "2",
    pseudolayer: newPseudolayer3,
});

const newUiLayer2 = generateUiLayer({
    name: "1",
    pseudolayer: newPseudolayer2,
});

export const PageContainer = (): JSX.Element => {
    const renderLoop = useContext(RenderLoopContext);

    const [uiLayers, setUiLayers] = useState<UiLayer[]>([
        newUiLayer,
        newUiLayer2,
    ]);
    const { activeUiLayer } = getActiveUiLayer(uiLayers);

    renderLoop.renderPseudolayer(
        activeUiLayer?.updatedPseudolayer || activeUiLayer?.config.pseudolayer
    );

    const updateUiLayers = (uiLayers: UiLayer[]) => {
        setUiLayers(uiLayers);
    };

    return (
        <ActionStateProvider>
            <Grid
                container
                spacing={0}
                sx={{
                    height: "calc(100vh - 16px)",
                    margin: "0px",
                    alignContent: "flex-start",
                }}
            >
                <Grid
                    item
                    xs={12}
                    sx={{
                        ...colors.background.default,
                        height: "5%",
                    }}
                >
                    <ToolbarContainer
                        uiLayers={uiLayers}
                        updateUiLayers={updateUiLayers}
                    />
                </Grid>
                <Grid
                    item
                    sx={{
                        ...colors.background.default,
                        height: "95%",
                        width: "15.625rem",
                    }}
                >
                    <LayerContainer
                        uiLayers={uiLayers}
                        updateUiLayers={updateUiLayers}
                    />
                </Grid>
                <Grid
                    item
                    sx={{
                        boxSizing: "border-box",
                        height: "95%",
                        width: "calc(100% - 15.625rem)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ActionContainer />
                    <MapContainer view={view} activeUiLayer={activeUiLayer} />
                    <Canvas />
                </Grid>
            </Grid>
        </ActionStateProvider>
    );
};
