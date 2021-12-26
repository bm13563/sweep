import { Vector as VectorSource } from "ol/source";
import Feature from "ol/Feature";


export function vector(features: Feature<any>[]) {
    return new VectorSource({
        features
    });
}