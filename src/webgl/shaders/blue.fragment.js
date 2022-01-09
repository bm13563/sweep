export const blueFragment = `
#version 300 es
precision mediump float;

in vec2 o_texCoord;

uniform sampler2D u_image;

out vec4 o_colour;

void main() {
    vec4 tex = texture(u_image, o_texCoord).rgba;
    o_colour = vec4(1.0 - tex.r, 1.0 - tex.g, 1.0 - tex.b, 1.0);
}
`;
