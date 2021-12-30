import * as olSource from "ol/source";

export interface XyzProps {
    url: string;
    attributions: string;
    maxZoom: number;
}

export function xyz({ url, attributions, maxZoom }: XyzProps) {
    return new olSource.XYZ({ url, attributions, maxZoom });
}
