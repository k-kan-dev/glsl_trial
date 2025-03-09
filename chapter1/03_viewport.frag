#version 300 es
precision mediump float;

out vec4 fragColor;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

void main(){
    vec2 pos = (gl_FragCoord.xy + u_mouse) / u_resolution.xy;
    fragColor = vec4(1., pos, 1.);
}