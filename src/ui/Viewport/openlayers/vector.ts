import { Vector as VectorSource } from "ol/source";
import Feature from "ol/Feature";
import Geometry from "ol/geom/Geometry";

export const vector = (
  features: Feature<Geometry>[]
): VectorSource<Geometry> => {
  return new VectorSource({
    features,
  });
};
