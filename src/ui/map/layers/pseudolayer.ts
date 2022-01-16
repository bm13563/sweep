import { v4 as uuidv4 } from "uuid";
import { isBaseLayer, isPseudolayer } from "../../../utils/utils";
import { baseFragment } from "../../../webgl/shaders/base.fragment";
import { baseVertex } from "../../../webgl/shaders/base.vertex";
import { BaseLayer } from "./layer";

export interface ShaderProps {
    vertexShader: string;
    fragmentShader: string;
}

export class Pseudolayer {
    uid: string = uuidv4();
    type = "pseudolayer";
    baseLayers: Record<string, BaseLayer> = {};
    inputs: Record<string, BaseLayer | Pseudolayer> = {};
    variables: Record<string, string> = {};
    shaders: ShaderProps;
    output?: WebGLTexture;

    constructor(
        inputs: Record<string, BaseLayer | Pseudolayer>,
        variables: Record<string, string>,
        shaders: ShaderProps
    ) {
        this.inputs = inputs;
        this.variables = variables;
        this.shaders = shaders;

        for (const key in inputs) {
            const child = inputs[key];
            if (isBaseLayer(child)) {
                this.baseLayers[child.uid] = child;
            }
            if (isPseudolayer(child)) {
                this.baseLayers = {
                    ...this.baseLayers,
                    ...child.baseLayers,
                };
            }
        }
    }
}

export const getDefaultPseudolayer = (layer: BaseLayer): Pseudolayer => {
    return new Pseudolayer(
        { u_image: layer },
        {},
        { vertexShader: baseVertex, fragmentShader: baseFragment }
    );
};
