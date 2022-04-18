export const filterAbsoluteRgbFragment = `
#version 300 es
precision mediump float;

in vec2 o_texCoord;

uniform sampler2D u_image;
uniform float r_max;
uniform float g_max;
uniform float b_max;

out vec4 o_colour;

void main() {
    vec4 tex = texture(u_image, o_texCoord).rgba;
    vec3 threshold = vec3(r_max, g_max, b_max);
    vec4 mask = tex;

    if (any(!#!{{operator}}!#!(tex.rgb, threshold))) {
        mask = vec4(0.0, 0.0, 0.0, 1.0);
    }

    o_colour = mask;
}
`;
