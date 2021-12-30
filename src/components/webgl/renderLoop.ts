import * as twgl from "twgl.js";
import { baseFragment } from "../canvas/shaders/base.fragment";
import { baseVertex } from "../canvas/shaders/base.vertex";
import { flipVertex } from "../canvas/shaders/flip.vertex";
import { mergeFragment } from "../canvas/shaders/merge.fragment";

export class RenderLoop {
    stopped = false;
    clock = new Date().getTime();
    fps = 60;
    ctxs: CanvasRenderingContext2D[] = [];

    registerWebGl(gl: WebGLRenderingContext): void {
        this.render(gl);
    }

    registerCanvas(ctx: CanvasRenderingContext2D): void {
        this.ctxs.push(ctx);
    }

    render(gl: WebGLRenderingContext): void {
        const flipProgram = twgl.createProgramInfo(gl, [
            flipVertex,
            baseFragment,
        ]);

        const mergeProgram = twgl.createProgramInfo(gl, [
            baseVertex,
            mergeFragment,
        ]);

        const manifest = () => {
            let framebuffer = twgl.createFramebufferInfo(gl);
            if (this.ctxs.length !== 2) {
                return;
            }

            const textures = this.ctxs.map((ctx) => {
                return twgl.createTexture(gl, {
                    src: ctx.canvas,
                });
            });

            const uniforms = [
                {
                    u_previous_image: textures[0],
                    u_current_image: textures[1],
                },
            ];

            const programs = [mergeProgram];

            for (let x = 0; x < programs.length; x++) {
                framebuffer = draw(programs[x], uniforms[x], framebuffer, true);
            }

            draw(
                flipProgram,
                { u_image: framebuffer.attachments[0] },
                framebuffer,
                false
            );

            textures.push(framebuffer.attachments[0]);
            textures.forEach((texture, index) => {
                gl.activeTexture(gl.TEXTURE0 + index);
                gl.bindTexture(gl.TEXTURE_2D, null);
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
                gl.deleteTexture(texture);
            });
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.deleteRenderbuffer(framebuffer.attachments[1]);
            gl.deleteFramebuffer(framebuffer.framebuffer);
        };

        const draw = (
            program: twgl.ProgramInfo,
            uniforms: Record<string, WebGLTexture>,
            framebuffer: twgl.FramebufferInfo,
            useFramebuffer?: boolean
        ) => {
            const quadVertices = twgl.primitives.createXYQuadBufferInfo(gl);

            twgl.resizeCanvasToDisplaySize(gl.canvas);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.useProgram(program.program);
            twgl.setBuffersAndAttributes(gl, program, quadVertices);
            twgl.setUniforms(program, uniforms);

            useFramebuffer
                ? twgl.bindFramebufferInfo(gl, framebuffer)
                : twgl.bindFramebufferInfo(gl, null);

            twgl.drawBufferInfo(gl, quadVertices, gl.TRIANGLES);

            quadVertices.attribs &&
                [
                    quadVertices.attribs.normal.buffer,
                    quadVertices.attribs.position.buffer,
                    quadVertices.attribs.texcoord.buffer,
                ].forEach((buffer) => {
                    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                    gl.bufferData(gl.ARRAY_BUFFER, 1, gl.STATIC_DRAW);
                    gl.deleteBuffer(buffer);
                });

            quadVertices.indices &&
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, quadVertices.indices);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, 1, gl.STATIC_DRAW);
            quadVertices.indices && gl.deleteBuffer(quadVertices.indices);

            return framebuffer;
        };

        const loop = () => {
            if (this.stopped) return;

            requestAnimationFrame(() => loop());
            const now = new Date().getTime();
            const elapsed = new Date().getTime() - this.clock;

            if (elapsed > 1000 / this.fps) {
                if (gl && this.ctxs.length) {
                    manifest();
                }

                this.clock = now - (elapsed % (1000 / this.fps));
            }
        };

        loop();
    }
}
