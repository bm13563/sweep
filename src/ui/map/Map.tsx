import View from "ol/View";
import React from "react";
import { PositionedCanvas, PositionedMapLayer } from "../position.styles";
import { BaseLayer } from "./layers/baseLayer";

export const Map = ({
    view,
    layers,
    className,
}: {
    view: View;
    layers: BaseLayer[];
    className?: string;
}): JSX.Element => {
    return (
        <div className={className}>
            <>
                <PositionedMapLayer view={view} layer={layers[0]} />
                <PositionedMapLayer view={view} layer={layers[1]} />
            </>
            <PositionedCanvas />
        </div>
    );
};
