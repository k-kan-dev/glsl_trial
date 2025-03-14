#version 300 es
precision highp float;

out vec4 fragColor;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main(){
    vec2 pos = gl_FragCoord.xy / u_resolution.xy;

    vec3[4] col4 = vec3[](
        vec3(1., .0, .0),
        vec3(.0, .0, 1.),
        vec3(.0, 1., .0),
        vec3(1., 1.0, .0)
    );

    vec3 col = mix(
        mix(col4[0], col4[1], pos.x),
        mix(col4[2], col4[3], pos.x),
        pos.y
    );
    fragColor = vec4(col, 1.0);
}