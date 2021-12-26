import styled from "styled-components";
import { Canvas } from "../canvas/Canvas";
import { Map } from "../map/map";
import { MapArea } from "./MapArea";

const positioning = {
  height: "650px",
  width: "800px",
};

export const PositionedMapArea = styled(MapArea)`
  position: relative;
  top: 0px;
  left: 70px;
  background-color: red;
  height: ${positioning.height};
  width: ${positioning.width};
  margin: 0px;
`;

export const PositionedMap = styled(Map)`
  position: absolute;
  height: ${positioning.height};
  width: ${positioning.width};
  z-index: 1;
`;

export const PositionedCanvas = styled(Canvas)`
  position: absolute;
  height: ${positioning.height};
  width: ${positioning.width};
  z-index: 0;
`;
