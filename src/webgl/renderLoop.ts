import * as twgl from "twgl.js";
import { isBaseLayer, isPseudolayer } from "../utils/utils";
import { baseFragment } from "./shaders/base.fragment";
import { flipVertex } from "./shaders/flip.vertex";
import { Pseudolayer } from "../ui/mapPanel/layers/pseudolayer";

export class RenderLoop {
    stopped = false;
    clock = new Date().getTime();
    fps = 60;
    contextCache: Record<string, CanvasRenderingContext2D> = {};
    programCache: Record<string, twgl.ProgramInfo> = {};
    pseudolayer?: Pseudolayer | undefined;
    gl?: WebGLRenderingContext;

    registerWebGl(gl: WebGLRenderingContext): void {
        this.gl = gl;
        this.render(gl);
    }

    registerContext(context: Record<string, CanvasRenderingContext2D>): void {
        console.log("register");
        this.contextCache = {
            ...this.contextCache,
            ...context,
        };
    }

    renderPseudolayer = (pseudolayer: Pseudolayer | undefined): void => {
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
            pseudolayer: Pseudolayer,
            contexts: Record<string, CanvasRenderingContext2D>,
            programs: Record<string, twgl.ProgramInfo>
        ) => {
            const recurse = (pseudolayer: Pseudolayer): void => {
                let program: twgl.ProgramInfo;
                const programHash = `
                    ${pseudolayer.config.shaders.vertexShader}
                    ${pseudolayer.config.shaders.fragmentShader}
                `;
                if (!(programHash in programs)) {
                    program = twgl.createProgramInfo(gl, [
                        pseudolayer.config.shaders.vertexShader,
                        pseudolayer.config.shaders.fragmentShader,
                    ]);
                    this.programCache[programHash] = program;
                } else {
                    program = programs[programHash];
                }

                const uniforms: Record<string, WebGLTexture> = {
                    ...pseudolayer.config.variables,
                };

                for (const key in pseudolayer.config.inputs) {
                    const child = pseudolayer.config.inputs[key];

                    if (isBaseLayer(child)) {
                        const texture = twgl.createTexture(gl, {
                            src: contexts[child.uid].canvas,
                        });
                        textureCleanup.push(texture);
                        textureInputTracker[child.uid] = texture;
                        uniforms[key] = texture;
                        return draw(pseudolayer, program, uniforms, true);
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
                    if (this.pseudolayer) {
                        if (Object.keys(this.contextCache).length) {
                            manifest(
                                this.pseudolayer,
                                this.contextCache,
                                this.programCache
                            );
                        }
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
