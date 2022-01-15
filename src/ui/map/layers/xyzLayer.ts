import { XYZ } from "ol/source";
import OLTileLayer from "ol/layer/Tile";
import { Layer } from "./baseLayer";

export interface XYZSourceProps {
    url: string;
}

export interface XYZLayerProps {
    source: XYZSourceProps;
    zIndex?: number;
}

export type XYZLayer = OLTileLayer<XYZ>;

export class XYZBaseLayer extends Layer {
    layer: XYZLayer;

    constructor(props: XYZLayerProps) {
        super();
        this.layer = new OLTileLayer({
            source: new XYZ({
                url: props.source.url,
                crossOrigin: "anonymous",
            }),
            zIndex: props.zIndex,
        });
    }
}
