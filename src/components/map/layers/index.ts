import { TileLayer } from "./TileLayer";
import { VectorLayer } from "./VectorLayer";

export * from "./TileLayer";
export * from "./VectorLayer";

export type LayerConfig = {
    uid: string,
    visible: boolean,
    layer: VectorLayer | TileLayer;
}