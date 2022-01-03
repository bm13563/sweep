import OLTileLayer from "ol/layer/Tile";
import TileSource from "ol/source/Tile";
import { Layer } from "./baseLayer";

export interface TileLayerProps {
    source: TileSource;
    zIndex?: number;
}

export type TileLayer = OLTileLayer<TileSource>;

export class TileBaseLayer extends Layer {
    layer: TileLayer;

    constructor(props: TileLayerProps) {
        super();
        this.layer = new OLTileLayer(props);
    }
}
