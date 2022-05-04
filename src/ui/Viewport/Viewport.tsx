import React from "react";
import View from "ol/View";
import { OpenlayersCanvas } from "./OpenlayersCanvas";
import { UiLayer } from "../../primitives/uiLayer";
import { findMapLayers } from "../../utils/utils";
import { WebGlCanvas } from "./WebGlCanvas";

export const Viewport = ({
    view,
    activeUiLayer,
}: {
    view: View;
    activeUiLayer: UiLayer | undefined;
}): JSX.Element => {
    const mapLayers = findMapLayers(activeUiLayer?.config.pseudolayer);

    return (
        <div className="relative top-0 w-full h-full m-0">
            {mapLayers.map((layer) => {
                return <OpenlayersCanvas key={layer.uid} view={view} layer={layer} />;
            })}
            <WebGlCanvas />
        </div>
    );
};
