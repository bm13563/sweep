import { fromLonLat } from "ol/proj";
import React from "react";
import View from "ol/View";
import { PositionedCanvas, PositionedMapLayer } from "../position.styles";
import { Pseudolayer } from "./layers/pseudolayer";

export const Map = ({
    view,
    pseudolayer,
    className,
}: {
    view: View;
    pseudolayer: Pseudolayer | undefined;
    className?: string;
}): JSX.Element => {
    return (
        <div className={className}>
            {pseudolayer &&
                Object.values(pseudolayer.baseLayers).map((baseLayer) => {
                    return (
                        <PositionedMapLayer
                            key={baseLayer.uid}
                            view={view}
                            layer={baseLayer}
                        />
                    );
                })}
        </div>
    );
};
