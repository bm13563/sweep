import OLVectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Geometry from "ol/geom/Geometry";
import { Layer } from "./baseLayer";

export interface VectorLayerProps {
    source: VectorSource<Geometry>;
    style: Style;
    zIndex?: number;
}

export type VectorLayer = OLVectorLayer<VectorSource<Geometry>>;

export class VectorBaseLayer extends Layer {
    layer: VectorLayer;

    constructor(props: VectorLayerProps) {
        super();
        this.layer = new OLVectorLayer(props);
    }
}
