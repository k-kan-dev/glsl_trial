#version 300 es
precision highp float;

out vec4 fragColor;
uniform vec2 u_resolution;
uniform float u_time;

const float PI = 3.1415926;
float atan2(float y, float x){
    if (x == 0.0){
        return sign(y) * PI / 2.0;
    } else{
        return atan(y, x);
    }
}

vec2 xy2pol (vec2 xy){
    return vec2(atan2(xy.y, xy.x), length(xy));
}
vec2 pol2xy(vec2 pol){
    return pol.y * vec2(cos(pol.x), sin(pol.x));
}

vec3  hsv2rgb(vec3 c){
    vec3 rgb = clamp(abs(mod(c.x*6.0 + vec3(.0, 4., 2.), 6. ) - 3.) - 1., .0, 1.);
    return c.z * mix(vec3(1.), rgb, c.y);
}

vec3 tex(vec2 st){
    float time = 0.2 * sin(u_time);
    vec3 circ = vec3(pol2xy(vec2(time, .5)) + .5, 1.0);
    // color
    vec3[3] col3 = vec3[](
        circ.rgb,
        circ.gbr,
        circ.brg
    );

    // st(s: theta, t: length)
    st.s = st.s / PI + 1.0; // radian =/PI=> degree =+1.0=> 1.0
    st.s += time;

    int ind = int(st.s); // index :
    vec3 col = mix(
        col3[ind % 3],
        col3[(ind + 1) % 3],
        fract(st.s) // 3.3 => .3
    );
    return mix(col3[2], col, st.s);
}

void main(){
    vec2 pos = gl_FragCoord.xy / u_resolution.xy; // normalization

    pos = 2.0 * pos.xy - vec2(1.0, 1.0); // 0.0-~1.0 =x2=> 0.0~2.0 =-1=> -1.0~1.0
    pos = xy2pol(pos); // xy coordination => polar coordination
    // pos = pol2xy(pos);
    fragColor = vec4(tex(pos), 1.0);
}