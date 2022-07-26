import { Parser } from "expr-eval";
import { PseudoLayer } from "../primitives/pseudoLayer";

export class ShaderBuilder {
  shader: string = "";
  inputs: Record<string, PseudoLayer> = {};

  addInput(pseudolayer: PseudoLayer) {
    this.inputs[pseudolayer.uid] = pseudolayer;
  }

  compile() {
    const shader = `
      #version 300 es
      precision mediump float;

      in vec2 o_texCoord;

      ${Object.keys(this.inputs)
        .map((key) => "uniform sampler2D " + key + ";")
        .join("\n")}

      out vec4 o_colour;

      void main() {
          ${Object.keys(this.inputs)
            .map((key) => `vec4 t_${key} = texture(${key}, o_texCoord).rgba;`)
            .join("/n")}
            
          vec4 tex = texture(u_image, o_texCoord).rgba;
          o_colour = vec4(r_colour * tex.r, g_colour * tex.g, b_colour * tex.b, 1.0);
      }
    `;
  }
}
