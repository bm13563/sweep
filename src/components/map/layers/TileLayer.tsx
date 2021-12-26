import OLTileLayer from "ol/layer/Tile";
import TileSource from "ol/source/Tile";
import { v4 as uuidv4 } from "uuid";
import { LayerConfig } from ".";


export interface TileLayerProps {
    source: TileSource;
    zIndex?: number;
}


export type TileLayer = OLTileLayer<TileSource>


export const createTileLayer = (props: TileLayerProps): LayerConfig => {
    return {
        uid: uuidv4(),
        visible: true,
        layer: new OLTileLayer(props)
    };
};
