import { v4 as uuidv4 } from "uuid";
import { getXYZLayer, XYZLayer, XYZLayerProps } from "./xyzLayer";

export type Layers = XYZLayer;

export type LayerProps = XYZLayerProps;

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

export const getLayer = (type: string, props: LayerProps): Layers => {
    return getXYZLayer(props);
};
