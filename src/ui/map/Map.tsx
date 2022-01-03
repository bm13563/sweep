import { fromLonLat } from "ol/proj";
import View from "ol/View";
import React from "react";
import { PositionedCanvas, PositionedMapLayer } from "../position.styles";
import { Pseudolayer } from "./layers/pseudolayer";

export const Map = ({
    pseudolayer,
    className,
}: {
    pseudolayer: Pseudolayer;
    className?: string;
}): JSX.Element => {
    const baseLayers = Object.values(pseudolayer.baseLayers);

    const view = new View({
        zoom: 9,
        center: fromLonLat([-94.9065, 38.9884]),
    });

    return (
        <div className={className}>
            {baseLayers.map((baseLayer) => {
                return (
                    <PositionedMapLayer
                        key={baseLayer.uid}
                        view={view}
                        layer={baseLayer}
                    />
                );
            })}
            <PositionedCanvas />
        </div>
    );
};
