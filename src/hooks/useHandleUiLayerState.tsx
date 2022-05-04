import create from "zustand";
import { generateLayer } from "../primitives/baseLayer";
import { generatePseudoLayer } from "../primitives/pseudoLayer";
import { generateUiLayer, UiLayer } from "../primitives/uiLayer";
import { baseFragment } from "../webgl/shaders/base.fragment";
import { baseVertex } from "../webgl/shaders/base.vertex";
import { blueFragment } from "../webgl/shaders/blue.fragment";

// boilerplate
const newLayer2 = generateLayer({
    type: "XYZ",
    url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
});

const newPseudolayer2 = generatePseudoLayer({
    inputs: { u_image: newLayer2 },
    variables: {},
    dynamics: {},
    shaders: { vertexShader: baseVertex, fragmentShader: baseFragment },
});

const newPseudolayer3 = generatePseudoLayer({
    inputs: { u_image: newPseudolayer2 },
    variables: {},
    dynamics: {},
    shaders: { vertexShader: baseVertex, fragmentShader: blueFragment },
});

const newUiLayer = generateUiLayer({
    name: "2",
    pseudolayer: newPseudolayer3,
});

const newUiLayer2 = generateUiLayer({
    name: "1",
    pseudolayer: newPseudolayer2,
});

type HandleUiLayerStateProps = {
    uiLayers: UiLayer[];
    activeUiLayer: UiLayer | undefined;
    activeIndex: number | undefined;
    setUiLayers: (uiLayers: UiLayer[]) => void;
};

export const useHandleUiLayerState = create<HandleUiLayerStateProps>((set) => ({
    uiLayers: [newUiLayer, newUiLayer2],
    activeUiLayer: newUiLayer,
    activeIndex: 0,
    setUiLayers: (uiLayers: UiLayer[]) => {
        const activeUiLayer = uiLayers.find((layer) => layer.visible);
        const activeIndex = activeUiLayer
            ? uiLayers.indexOf(activeUiLayer)
            : undefined;
        set(() => ({ uiLayers }));
        set(() => ({ activeUiLayer }));
        set(() => ({ activeIndex }));
    },
}));
