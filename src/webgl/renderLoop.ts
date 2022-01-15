import * as twgl from "twgl.js";
import { Pseudolayer } from "../ui/map/layers/pseudolayer";
import { isBaseLayer, isPseudolayer } from "../utils/utils";
import { baseFragment } from "./shaders/base.fragment";
import { flipVertex } from "./shaders/flip.vertex";

export class RenderLoop {
    stopped = false;
    clock = new Date().getTime();
    fps = 24;
    pseudolayer?: Pseudolayer | undefined;
    gl?: WebGLRenderingContext;

    registerWebGl(gl: WebGLRenderingContext): void {
        this.gl = gl;
        this.render(gl);
    }

    renderPseudolayer = (pseudolayer: Pseudolayer | undefined): void => {
        this.pseudolayer = pseudolayer;
    };

    render(gl: WebGLRenderingContext): void {
        let textures: WebGLTexture[] = [];
        const flipProgram = twgl.createProgramInfo(gl, [
            flipVertex,
            baseFragment,
        ]);

        const manifest = (pseudolayer: Pseudolayer) => {
            const recurse = (pseudolayer: Pseudolayer): void => {
                const program = twgl.createProgramInfo(gl, [
                    pseudolayer.shaders.vertexShader,
                    pseudolayer.shaders.fragmentShader,
                ]);
                const uniforms: Record<string, WebGLTexture> = {
                    ...pseudolayer.variables,
                };

                for (const key in pseudolayer.inputs) {
                    const child = pseudolayer.inputs[key];

                    if (isBaseLayer(child) && child.context) {
                        const texture = twgl.createTexture(gl, {
                            src: child.context.canvas,
                        });
                        textures.push(texture);
                        uniforms[key] = texture;
                        return draw(pseudolayer, program, uniforms, true);
                    }

                    if (isPseudolayer(child)) {
                        recurse(child);
                        if (child.output) {
                            const texture = child.output;
                            uniforms[key] = texture;
                        }
                    }
                }
                draw(pseudolayer, program, uniforms, true);
            };

            recurse(pseudolayer);

            if (pseudolayer.output) {
                textures.push(pseudolayer.output);
                draw(
                    pseudolayer,
                    flipProgram,
                    { u_image: pseudolayer.output },
                    false
                );
            }

            textures.forEach((texture) => {
                gl.deleteTexture(texture);
            });
            textures = [];
        };

        const draw = (
            pseudolayer: Pseudolayer,
            program: twgl.ProgramInfo,
            uniforms: Record<string, WebGLTexture | string>,
            useFramebuffer?: boolean
        ) => {
            const quadVertices = twgl.primitives.createXYQuadBufferInfo(gl);
            const framebuffer = twgl.createFramebufferInfo(gl);

            twgl.resizeCanvasToDisplaySize(gl.canvas);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.useProgram(program.program);
            twgl.setBuffersAndAttributes(gl, program, quadVertices);
            twgl.setUniforms(program, uniforms);

            useFramebuffer
                ? twgl.bindFramebufferInfo(gl, framebuffer)
                : twgl.bindFramebufferInfo(gl, null);

            twgl.drawBufferInfo(gl, quadVertices, gl.TRIANGLES);

            pseudolayer.output = framebuffer.attachments[0];

            textures.push(framebuffer.attachments[0]);
            gl.deleteRenderbuffer(framebuffer.attachments[1]);
            gl.deleteFramebuffer(framebuffer.framebuffer);
        };

        const loop = () => {
            if (this.stopped) return;

            requestAnimationFrame(() => loop());
            const now = new Date().getTime();
            const elapsed = new Date().getTime() - this.clock;

            if (elapsed > 1000 / this.fps) {
                if (gl) {
                    if (this.pseudolayer) {
                        manifest(this.pseudolayer);
                    } else {
                        gl.clearColor(1.0, 1.0, 1.0, 1.0);
                        gl.clear(gl.COLOR_BUFFER_BIT);
                    }
                }
                this.clock = now - (elapsed % (1000 / this.fps));
            }
        };

        loop();
    }
}
