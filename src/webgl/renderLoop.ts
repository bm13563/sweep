import * as twgl from "twgl.js";
import { PseudoLayer } from "../primitives/pseudoLayer";
import { isBaseLayer, isPseudolayer } from "../utils/utils";
import { baseFragment } from "./shaders/base.fragment";
import { flipVertex } from "./shaders/flip.vertex";

export class RenderLoop {
  stopped = false;
  clock = new Date().getTime();
  fps = 30;
  contextCache: Record<string, CanvasRenderingContext2D> = {};
  programCache: Record<string, twgl.ProgramInfo> = {};
  bufferCache: Record<string, string> = {};
  pseudolayer?: PseudoLayer | undefined;
  gl?: WebGLRenderingContext;

  registerWebGl(gl: WebGLRenderingContext): void {
    this.gl = gl;
    this.render(gl);
  }

  registerContext(context: Record<string, CanvasRenderingContext2D>): void {
    this.contextCache = {
      ...this.contextCache,
      ...context,
    };
  }

  renderPseudolayer = (pseudolayer: PseudoLayer | undefined): void => {
    this.pseudolayer = pseudolayer;
  };

  render(gl: WebGLRenderingContext): void {
    let textureCleanup: WebGLTexture[] = [];
    let textureInputTracker: Record<string, WebGLTexture> = {};
    const quadVertices = twgl.primitives.createXYQuadBufferInfo(gl);

    const flipProgram = twgl.createProgramInfo(gl, [flipVertex, baseFragment]);

    const manifest = (
      pseudolayer: PseudoLayer,
      contexts: Record<string, CanvasRenderingContext2D>,
      programs: Record<string, twgl.ProgramInfo>
    ) => {
      twgl.resizeCanvasToDisplaySize(gl.canvas);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      let killswitch = false;

      const recurse = (pseudolayer: PseudoLayer): void => {
        if (killswitch) {
          return;
        }

        let dynamicFragmentShader =
          pseudolayer.properties.shaders.fragmentShader;
        for (const key in pseudolayer.properties.dynamics) {
          const re = new RegExp(`!#!{{${key}}}!#!`, "g");
          dynamicFragmentShader = dynamicFragmentShader.replace(
            re,
            pseudolayer.properties.dynamics[key]
          );
        }
        let program: twgl.ProgramInfo;

        const programHash = `
                    ${pseudolayer.properties.shaders.vertexShader}
                    ${dynamicFragmentShader}
                `;
        if (programHash in programs) {
          program = programs[programHash];
        } else {
          program = twgl.createProgramInfo(gl, [
            pseudolayer.properties.shaders.vertexShader,
            dynamicFragmentShader,
          ]);
          this.programCache[programHash] = program;
        }

        const uniforms: Record<string, WebGLTexture> = {
          ...pseudolayer.properties.variables,
        };

        for (const key in pseudolayer.properties.inputs) {
          const child = pseudolayer.properties.inputs[key];

          if (isBaseLayer(child)) {
            if (child.uid in contexts) {
              const texture = twgl.createTexture(gl, {
                src: contexts[child.uid].canvas,
              });
              textureCleanup.push(texture);
              textureInputTracker[child.uid] = texture;
              uniforms[key] = texture;
              return draw(pseudolayer, program, uniforms, true);
            } else {
              killswitch = true;
            }
          }

          if (isPseudolayer(child)) {
            recurse(child);
            if (child.uid in textureInputTracker) {
              const texture = textureInputTracker[child.uid];
              uniforms[key] = texture;
            }
          }
        }
        draw(pseudolayer, program, uniforms, true);
      };

      recurse(pseudolayer);

      if (pseudolayer.uid in textureInputTracker) {
        textureCleanup.push(textureInputTracker[pseudolayer.uid]);
        draw(
          pseudolayer,
          flipProgram,
          { u_image: textureInputTracker[pseudolayer.uid] },
          false
        );
      }

      textureCleanup.forEach((texture) => {
        gl.deleteTexture(texture);
      });

      textureCleanup = [];
      textureInputTracker = {};
    };

    const draw = (
      pseudolayer: PseudoLayer,
      program: twgl.ProgramInfo,
      uniforms: Record<string, WebGLTexture | string>,
      useFramebuffer?: boolean
    ) => {
      const framebuffer = twgl.createFramebufferInfo(
        gl,
        undefined,
        useFramebuffer ? undefined : 0,
        useFramebuffer ? undefined : 0
      );

      gl.useProgram(program.program);
      twgl.setBuffersAndAttributes(gl, program, quadVertices);
      twgl.setUniforms(program, uniforms);

      useFramebuffer
        ? twgl.bindFramebufferInfo(gl, framebuffer)
        : twgl.bindFramebufferInfo(gl, null);

      twgl.drawBufferInfo(gl, quadVertices, gl.TRIANGLES);

      textureInputTracker[pseudolayer.uid] = framebuffer.attachments[0];

      textureCleanup.push(framebuffer.attachments[0]);
      gl.deleteRenderbuffer(framebuffer.attachments[1]);
      gl.deleteFramebuffer(framebuffer.framebuffer);
    };

    const loop = () => {
      if (this.stopped) return;

      const now = new Date().getTime();
      const elapsed = now - this.clock;

      if (elapsed > 1000 / this.fps) {
        if (gl) {
          if (this.pseudolayer) {
            manifest(this.pseudolayer, this.contextCache, this.programCache);
          } else {
            gl.clearColor(0.9, 0.9, 0.9, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
          }
        }
        this.clock = now - (elapsed % (1000 / this.fps));
      }
      requestAnimationFrame(() => loop());
    };

    loop();
  }
}
