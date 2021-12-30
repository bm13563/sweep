import { createContext } from "react";
import Map from "ol/Map";

export interface ContextProps {
    map: Map | undefined;
}

export const MapContext = createContext<ContextProps>({ map: undefined });
