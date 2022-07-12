import * as olSource from "ol/source";

export interface XyzProps {
  url: string;
  attributions: string;
  maxZoom: number;
}

export const xyz = ({ url, attributions, maxZoom }: XyzProps): olSource.XYZ => {
  return new olSource.XYZ({ url, attributions, maxZoom });
};
