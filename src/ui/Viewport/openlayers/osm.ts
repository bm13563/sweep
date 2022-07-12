import * as olSource from "ol/source";

export const osm = (): olSource.OSM => {
  return new olSource.OSM();
};
