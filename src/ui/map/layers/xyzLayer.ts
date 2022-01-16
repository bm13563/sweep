import { XYZ } from "ol/source";
import OLTileLayer from "ol/layer/Tile";
import { Layer } from "./layer";
import { get as getProjection } from "ol/proj";

export interface XYZSourceProps {
    url: string;
}

export interface XYZBaseLayerProps {
    source: XYZSourceProps;
}

export type XYZLayer = OLTileLayer<XYZ>;

export class XYZBaseLayer extends Layer {
    layer: XYZLayer;

    constructor(props: XYZBaseLayerProps) {
        super();
        this.layer = new OLTileLayer({
            source: new XYZ({
                url: props.source.url,
                crossOrigin: "anonymous",
                projection: getProjection("EPSG:3857"),
            }),
            zIndex: 0,
        });
    }
}

export const getXYZLayer = (props: XYZBaseLayerProps): XYZBaseLayer => {
    return new XYZBaseLayer(props);
};
