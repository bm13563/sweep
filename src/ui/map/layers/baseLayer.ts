import { v4 as uuidv4 } from "uuid";
import { TileBaseLayer } from "./tileLayer";
import { VectorBaseLayer } from "./vectorLayer";

export type BaseLayer = TileBaseLayer | VectorBaseLayer;

export class Layer {
    uid: string = uuidv4();
    type = "baseLayer";
    context?: CanvasRenderingContext2D;

    registerContext(context: CanvasRenderingContext2D): void {
        this.context = context;
    }
}
