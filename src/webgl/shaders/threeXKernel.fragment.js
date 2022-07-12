export const threeXKernalFragment = `
#version 300 es
precision mediump float;

uniform sampler2D u_image;
uniform float textureWidth;
uniform float textureHeight;
uniform float kernel[9];
uniform float kernelWeight;

in vec2 o_texCoord;

out vec4 o_colour;

void main() {
   vec2 onePixel = vec2(1.0 / textureWidth, 1.0 / textureHeight);
   vec4 colorSum =
       texture(u_image, o_texCoord + onePixel * vec2(-1, -1)) * kernel[0] +
       texture(u_image, o_texCoord + onePixel * vec2( 0, -1)) * kernel[1] +
       texture(u_image, o_texCoord + onePixel * vec2( 1, -1)) * kernel[2] +
       texture(u_image, o_texCoord + onePixel * vec2(-1,  0)) * kernel[3] +
       texture(u_image, o_texCoord + onePixel * vec2( 0,  0)) * kernel[4] +
       texture(u_image, o_texCoord + onePixel * vec2( 1,  0)) * kernel[5] +
       texture(u_image, o_texCoord + onePixel * vec2(-1,  1)) * kernel[6] +
       texture(u_image, o_texCoord + onePixel * vec2( 0,  1)) * kernel[7] +
       texture(u_image, o_texCoord + onePixel * vec2( 1,  1)) * kernel[8] ;
   o_colour = vec4((colorSum / kernelWeight).rgb, 1);
}
`;
