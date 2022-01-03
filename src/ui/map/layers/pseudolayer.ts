import { v4 as uuidv4 } from "uuid";
import { BaseLayer } from "./baseLayer";

export interface ShaderProps {
    vertexShader: string;
    fragmentShader: string;
}

export class Pseudolayer {
    uid: string = uuidv4();
    type = "pseudolayer";
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
    }
}
