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

vec3 tex(vec2 st){
    float time = 0.1 + sin(u_time)*.1;
    // color
    vec3[3] col3 = vec3[](
        vec3(0.0, 0.0, 1.0),
        vec3(1.0, 0.0, 0.0),
        vec3(1)
    );

    // st(s: theta, t: length)
    st.s = st.s / PI + .8 ; // radian =/PI=> degree =+1.0=> 1.0
    st.s += time;
    int ind = int(st.s); // index :
    vec3 col = mix(
        col3[ind % 2],
        col3[(ind+1) % 2],
        fract(st.s) // 3.3 => .3
    );
    return mix(col3[2], col, st.s);
}

void main(){
    vec2 pos = gl_FragCoord.xy / u_resolution.xy; // normalization

    pos = 2.0 * pos.xy - vec2(1., 1.); // 0.0-~1.0 =x2=> 0.0~2.0 =-1=> -1.0~1.0
    pos = xy2pol(pos); // xy coordination => polar coordination
    // pos = pol2xy(pos);
    fragColor = vec4(tex(pos), 1.0);
}