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
import { generateLayer2 } from "./mapPanel/layers/layer2";
import { generatePseudolayer2 } from "./mapPanel/layers/pseudolayer2";
import { baseVertex } from "../webgl/shaders/base.vertex";
import { baseFragment } from "../webgl/shaders/base.fragment";
import { generateUiLayer, getActiveUiLayer, UiLayer } from "./uiLayer";
import update from "immutability-helper";
import { blueFragment } from "../webgl/shaders/blue.fragment";

const view = defaultView();

const newLayer2 = generateLayer2({
    type: "XYZ",
    url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
});

const newPseudolayer2 = generatePseudolayer2({
    inputs: { u_image: newLayer2 },
    variables: {},
    shaders: { vertexShader: baseVertex, fragmentShader: baseFragment },
});

const newPseudolayer3 = generatePseudolayer2({
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

    renderLoop.renderPseudolayer(activeUiLayer?.config.pseudolayer);

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
                <Grid item xs={12} sx={{ height: "5%" }}>
                    {/* <ToolbarContainer uiLayers={uiLayers} /> */}
                </Grid>
                <Grid item sx={{ height: "95%", width: "15.625rem" }}>
                    <LayerContainer
                        uiLayers={uiLayers}
                        updateUiLayers={updateUiLayers}
                    />
                </Grid>
                <Grid
                    item
                    sx={{
                        height: "95%",
                        width: "calc(100% - 15.625rem)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ActionContainer />
                    <MapContainer view={view} uiLayers={uiLayers} />
                    <Canvas />
                </Grid>
            </Grid>
        </ActionStateProvider>
    );
};
