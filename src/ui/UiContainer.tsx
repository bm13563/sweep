import React, { useContext } from "react";
import { RenderLoopContext } from "../App";
import { LayerContainer } from "./leftPanel/LayerContainer";
import { MapContainer } from "./mapPanel/MapContainer";
import { Canvas } from "./mapPanel/Canvas";
import { defaultView } from "../utils/utils";
import { ToolbarContainer } from "./topPanel/ToolbarContainer";
import { GetActiveUiLayer } from "../hooks/GetActiveUiLayer";
import { Action } from "./actionPanel/Action";
import { HandleUiLayerState } from "../hooks/HandleUiLayerState";

const view = defaultView();

export const PageContainer = (): JSX.Element => {
    const renderLoop = useContext(RenderLoopContext);

    const uiLayers = HandleUiLayerState((state) => state.uiLayers);
    const { activeUiLayer } = GetActiveUiLayer(uiLayers);

    renderLoop.renderPseudolayer(
        activeUiLayer?.pendingPseudolayer || activeUiLayer?.config.pseudolayer
    );

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
                <ToolbarContainer />
            </div>
            <div className="row-start-2 col-start-1 flex flex-col items-center">
                <LayerContainer />
            </div>
            <div className="row-start-2 col-start-2 flex justify-center items-center">
                <Action />
                <MapContainer view={view} activeUiLayer={activeUiLayer} />
                <Canvas />
            </div>
        </div>
    );
};
