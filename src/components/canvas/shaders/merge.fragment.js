export const mergeFragment = `
#version 300 es
precision mediump float;

in vec2 o_texCoord;

uniform sampler2D u_current_image;
uniform sampler2D u_previous_image;

out vec4 o_colour;

void main() {
    vec4 current = texture(u_current_image, o_texCoord);
    vec4 previous = texture(u_previous_image, o_texCoord);

    if (current.a == 0.0) {
        o_colour = previous;
    } else {
        o_colour = mix(previous, current, current.a);
    }
}
`;
