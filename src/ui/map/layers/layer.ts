import { v4 as uuidv4 } from "uuid";
import { getXYZLayer, XYZBaseLayer, XYZBaseLayerProps } from "./xyzLayer";

export type BaseLayer = XYZBaseLayer;

export type LayerProps = XYZBaseLayerProps;

export enum LayerTypes {
    XYZ = "XYZ",
}

export class Layer {
    uid: string = uuidv4();
    type = "baseLayer";
    context?: CanvasRenderingContext2D;

    registerContext(context: CanvasRenderingContext2D): void {
        this.context = context;
    }
}

export const getLayer = (type: string, props: LayerProps): BaseLayer => {
    return getXYZLayer(props);
};
