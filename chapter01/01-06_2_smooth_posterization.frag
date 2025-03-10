#version 300 es
precision mediump float;

out vec4 fragColor;
uniform vec2 u_resolution;
uniform float u_time;

int channel;

void main(){
    vec2 pos = gl_FragCoord.xy / u_resolution.xy;

    float n = 4.0;
    pos *= n;
    channel = int(2.0*gl_FragCoord.x / u_resolution.x);

    if (channel == 0){
        pos = floor(pos) + step(0.5, fract(pos));
    } else {
        float thr = 0.25 * sin(u_time);
        pos = floor(pos) +
            smoothstep(
                0.25 + thr,
                0.75 - thr,
                fract(pos)
            );
    }

    pos /= n;

    fragColor = vec4(1., pos, 1.);
}