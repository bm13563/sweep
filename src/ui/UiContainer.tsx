import React, { useContext, useState } from "react";
import { RenderLoopContext } from "../App";
import { LayerContainer } from "./leftPanel/LayerContainer";
import { MapContainer } from "./mapPanel/MapContainer";
import { Canvas } from "./mapPanel/Canvas";
import { defaultView } from "../utils/utils";
import { ToolbarContainer } from "./topPanel/ToolbarContainer";
import { generateLayer } from "./mapPanel/layers/layer";
import { generatePseudolayer } from "./mapPanel/layers/pseudolayer";
import { baseVertex } from "../webgl/shaders/base.vertex";
import { baseFragment } from "../webgl/shaders/base.fragment";
import { generateUiLayer, UiLayer } from "./uiLayer";
import { blueFragment } from "../webgl/shaders/blue.fragment";
import { GetActiveUiLayer } from "../hooks/GetActiveUiLayer";
import { Action } from "./actionPanel/Action";

const view = defaultView();

const newLayer2 = generateLayer({
    type: "XYZ",
    url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
});

const newPseudolayer2 = generatePseudolayer({
    inputs: { u_image: newLayer2 },
    variables: {},
    dynamics: {},
    shaders: { vertexShader: baseVertex, fragmentShader: baseFragment },
});

const newPseudolayer3 = generatePseudolayer({
    inputs: { u_image: newPseudolayer2 },
    variables: {},
    dynamics: {},
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
    const { activeUiLayer } = GetActiveUiLayer(uiLayers);

    renderLoop.renderPseudolayer(
        activeUiLayer?.updatedPseudolayer || activeUiLayer?.config.pseudolayer
    );

    const updateUiLayers = (uiLayers: UiLayer[]) => {
        setUiLayers(uiLayers);
    };

    return (
        <div
            className="grid content-start"
            style={{
                height: "calc(100vh - 16px)",
                gridTemplateRows: "[r1] 5% [r2] 95% [rend]",
                gridTemplateColumns: "[c1] 15.625rem [c2] auto [cend]",
            }}
        >
            <div className="row-start-1 col-start-2">
                <ToolbarContainer
                    uiLayers={uiLayers}
                    updateUiLayers={updateUiLayers}
                />
            </div>
            <div className="row-start-2 col-start-1 flex flex-col items-center">
                <LayerContainer
                    uiLayers={uiLayers}
                    updateUiLayers={updateUiLayers}
                />
            </div>
            <div className="row-start-2 col-start-2 flex justify-center items-center">
                <Action />
                <MapContainer view={view} activeUiLayer={activeUiLayer} />
                <Canvas />
            </div>
        </div>
    );
};
