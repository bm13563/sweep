import * as twgl from "twgl.js";
import { isBaseLayer2, isPseudolayer2 } from "../utils/utils";
import { baseFragment } from "./shaders/base.fragment";
import { flipVertex } from "./shaders/flip.vertex";
import { Pseudolayer2 } from "../ui/mapPanel/layers/pseudolayer2";

export class RenderLoop {
    stopped = false;
    clock = new Date().getTime();
    fps = 30;
    contexts: Record<string, CanvasRenderingContext2D> = {};
    pseudolayer?: Pseudolayer2 | undefined;
    gl?: WebGLRenderingContext;

    registerWebGl(gl: WebGLRenderingContext): void {
        this.gl = gl;
        this.render(gl);
    }

    registerContext(context: Record<string, CanvasRenderingContext2D>): void {
        this.contexts = {
            ...this.contexts,
            ...context,
        };
    }

    renderPseudolayer = (pseudolayer: Pseudolayer2 | undefined): void => {
        this.contexts = {};
        this.pseudolayer = pseudolayer;
    };

    render(gl: WebGLRenderingContext): void {
        let textureCleanup: WebGLTexture[] = [];
        let textureInputTracker: Record<string, WebGLTexture> = {};

        const flipProgram = twgl.createProgramInfo(gl, [
            flipVertex,
            baseFragment,
        ]);

        const manifest = (
            pseudolayer: Pseudolayer2,
            contexts: Record<string, CanvasRenderingContext2D>
        ) => {
            const recurse = (pseudolayer: Pseudolayer2): void => {
                const program = twgl.createProgramInfo(gl, [
                    pseudolayer.config.shaders.vertexShader,
                    pseudolayer.config.shaders.fragmentShader,
                ]);
                const uniforms: Record<string, WebGLTexture> = {
                    ...pseudolayer.config.variables,
                };

                for (const key in pseudolayer.config.inputs) {
                    const child = pseudolayer.config.inputs[key];

                    if (isBaseLayer2(child)) {
                        const texture = twgl.createTexture(gl, {
                            src: contexts[child.uid].canvas,
                        });
                        textureCleanup.push(texture);
                        textureInputTracker[child.uid] = texture;
                        uniforms[key] = texture;
                        return draw(pseudolayer, program, uniforms, true);
                    }

                    if (isPseudolayer2(child)) {
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
            pseudolayer: Pseudolayer2,
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

            textureInputTracker[pseudolayer.uid] = framebuffer.attachments[0];

            textureCleanup.push(framebuffer.attachments[0]);
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
                    if (this.pseudolayer && Object.keys(this.contexts).length) {
                        manifest(this.pseudolayer, this.contexts);
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
