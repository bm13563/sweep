import OLVectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Geometry from "ol/geom/Geometry";
import { v4 as uuidv4 } from "uuid";
import { LayerConfig } from ".";

export interface VectorLayerProps {
    source: VectorSource<Geometry>;
    style: Style;
    zIndex?: number;
}

export type VectorLayer = OLVectorLayer<VectorSource<Geometry>>;

export const createVectorLayer = (props: VectorLayerProps): LayerConfig => ({
    uid: uuidv4(),
    visible: true,
    layer: new OLVectorLayer(props),
});
