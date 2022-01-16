import { XYZ } from "ol/source";
import OLTileLayer from "ol/layer/Tile";
import { Layer } from "./layer";
import { get as getProjection } from "ol/proj";

export interface XYZSourceProps {
    url: string;
}

export interface XYZLayerProps {
    source: XYZSourceProps;
}

export class XYZLayer extends Layer {
    mapLayer: OLTileLayer<XYZ>;

    constructor(props: XYZLayerProps) {
        super();
        this.mapLayer = new OLTileLayer({
            source: new XYZ({
                url: props.source.url,
                crossOrigin: "anonymous",
                projection: getProjection("EPSG:3857"),
            }),
            zIndex: 0,
        });
    }
}

export const getXYZLayer = (props: XYZLayerProps): XYZLayer => {
    return new XYZLayer(props);
};
