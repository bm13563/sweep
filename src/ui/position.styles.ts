import styled from "styled-components";
import { Map } from "./map/Map";
import { Canvas } from "./canvas/Canvas";
import { MapLayer } from "./map/mapLayer/mapLayer";

const positioning = {
    height: "650px",
    width: "800px",
};

export const PositionedMap = styled(Map)`
    position: relative;
    top: 0px;
    height: 100%;
    width: 100%;
    margin: 0px;
`;

export const PositionedMapLayer = styled(MapLayer)`
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
    opacity: 0;
`;

export const PositionedCanvas = styled(Canvas)`
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 0;
`;
