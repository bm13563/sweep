import styled from "styled-components";
import { Canvas } from "../canvas/Canvas";
import { MapLayer } from "../map/map";
import { MapArea } from "./MapArea";

const positioning = {
    height: "650px",
    width: "800px",
};

export const PositionedMapArea = styled(MapArea)`
    position: relative;
    top: 0px;
    left: 70px;
    height: ${positioning.height};
    width: ${positioning.width};
    margin: 0px;
`;

export const PositionedMapLayer = styled(MapLayer)`
    position: absolute;
    height: ${positioning.height};
    width: ${positioning.width};
    z-index: 1;
    opacity: 0;
`;

export const PositionedCanvas = styled(Canvas)`
    position: absolute;
    height: ${positioning.height};
    width: ${positioning.width};
    z-index: 0;
`;
