export const adjustColorsFragment = `
#version 300 es
precision mediump float;

in vec2 o_texCoord;

uniform sampler2D u_image;
uniform float r_colour;
uniform float g_colour;
uniform float b_colour;

out vec4 o_colour;

void main() {
    vec4 tex = texture(u_image, o_texCoord).rgba;
    o_colour = vec4(r_colour * tex.r, g_colour * tex.g, b_colour * tex.b, 1.0);
}
`;
