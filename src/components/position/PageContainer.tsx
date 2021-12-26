import React, { useState } from "react";
import { PositionedMapArea } from "./position.styles";

export const PageContainer = () => {
    const [layers, setLayers] = useState([]);

    return (
        <>
            <PositionedMapArea />
        </>
    );
};