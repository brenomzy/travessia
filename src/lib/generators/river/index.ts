/**
 * River engine: the hero river chosen in the shader lab (docs/design/shader-lab/river5.html, tile 8i, 2026-11-21) as a
 * WebGL2 fragment shader. Framework-agnostic (SPEC §5.4 rule 7): no React, no Astro, no Motion.
 *
 * One light river winds down the right of the frame. Inside it, water from deep to shallow with white streaks drifting
 * downstream and a lit crest at the banks; around it, the dark land with a faint glow and clean one-pixel echo lines
 * that follow the bank outwards. The width swells and narrows slowly along the river.
 *
 * Colours come from the caller (the page reads them from CSS tokens), so the shader holds no brand values.
 * `render(0)` is the still used with reduced motion.
 */

export type Rgb = [number, number, number];

export type RiverColors = {
  /** The land: rio-negro. */
  dark: Rgb;
  /** Glow on the land and the shallow water: igarapé 500. */
  light: Rgb;
  /** Foam at the banks: igarapé 200. */
  foam: Rgb;
  /** Shallow water and echo lines near the bank: igarapé 300. */
  shallow: Rgb;
  /** Deep water mid-stream: igarapé 700. */
  deep: Rgb;
  /** Echo lines far from the bank: a cool grey. */
  echo: Rgb;
};

export type RiverOptions = RiverColors & {
  /** Where the river's centre line sits, 0–1 across the frame. 0.66 in the lab. */
  at?: number;
  /** Device pixels per CSS pixel, capped by the caller. */
  dpr?: number;
};

export type RiverRenderer = {
  /** Draws one frame at `time` seconds, resizing to the canvas's box first if it changed. */
  render(time: number): void;
  destroy(): void;
};

const VERT = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_at;
uniform vec3 u_dark, u_light, u_foam, u_shallow, u_deep, u_echo;
out vec4 outColor;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
// 3D simplex noise (Ashima Arts, MIT).
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
float fbm3(vec3 p) { float s = 0., a = .5; for (int i = 0; i < 3; i++) { s += a * snoise(p); p = p * 2.02 + 17.1; a *= .5; } return s; }

// The course: a along the river (height units, 0 at the bottom), returned across it.
float cen(float a, float t, float asp) {
  return (u_at + .13 * sin(a * 4.2 + .6) + .05 * sin(a * 9.1 + 2.3) + .015 * sin(a * 17. + 1.) + .022 * snoise(vec3(a * 2.5, 0., t * .02))) * asp;
}
// Wider at the bottom, as if seen in perspective.
float wid(float a, float t) {
  return mix(.074, .026, smoothstep(0., 1., a)) * (1. + .2 * snoise(vec3(a * 5., 3., t * .015)));
}
// A line about px pixels wide wherever k crosses a whole number.
float lineAA(float k, float px) {
  float fw = max(fwidth(k), 1e-4);
  float l = abs(fract(k - .5) - .5) / fw;
  return 1. - smoothstep(px * .5 - .5, px * .5 + .5, l);
}

void main() {
  vec3 DARK = u_dark / 255., LIGHT = u_light / 255., FOAM = u_foam / 255., SHALLOW = u_shallow / 255., DEEP = u_deep / 255., ECHO = u_echo / 255.;
  vec2 uv = gl_FragCoord.xy / u_res; float asp = u_res.x / u_res.y; float t = u_time;
  vec2 P = vec2(uv.x * asp, uv.y);
  float a = P.y, c = P.x, e = .002;
  float c0 = cen(a, t, asp); float sl = (cen(a + e, t, asp) - cen(a - e, t, asp)) / (2. * e);
  float w = wid(a, t) * (1. + .14 * sin(t * .3 + a * 2.));
  float dn = (c - c0) / sqrt(1. + sl * sl);
  float dsm = abs(dn) - w;                              // smooth bank, for the echoes
  float d = dsm + .0035 * fbm3(vec3(P * 26., 1.));      // rough bank, for the water's edge
  float s = clamp(dn / w, -1., 1.);
  float depth = 1. - s * s;
  float od = max(d, 0.), ods = max(dsm, 0.);

  vec3 water = mix(SHALLOW, DEEP, depth * .75);
  float flow = a * 3. + t * .1;
  float l1 = pow(1. - abs(snoise(vec3(s * 1.6, flow, t * .03))), 16.);
  float l2 = pow(1. - abs(snoise(vec3(s * 3.2, flow * 2.2 + 4., t * .05 + 2.))), 24.);
  water = mix(water, vec3(1.), clamp(l1 * .75 + l2 * .5, 0., 1.));
  float crest = smoothstep(.75, 1., abs(s)) * smoothstep(-.2, .6, snoise(vec3(s, a * 22. + t * .35, 1.)));
  water = mix(water, mix(FOAM, vec3(1.), .6), crest * .6);

  vec3 land = DARK + fbm3(vec3(P * 3., 7.)) * .015;
  land += LIGHT * .1 * exp(-od * 14.) + DEEP * .09 * exp(-od * 4.);
  float ring = lineAA(ods * 46. - t * .04, 1.) * smoothstep(.006, .012, ods) * exp(-ods * 7.);
  land = mix(land, mix(SHALLOW, ECHO, smoothstep(0., .18, ods)), clamp(ring, 0., 1.) * .6);

  float aa = fwidth(d) * 1.2;
  float inside = 1. - smoothstep(-aa, aa, d);
  outColor = vec4(mix(land, water, inside), 1.);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? 'shader');
  return sh;
}

/** Returns a renderer, or null when WebGL2 isn't available (the caller keeps the plain background). */
export function createRiverRenderer(canvas: HTMLCanvasElement, options: RiverOptions): RiverRenderer | null {
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, preserveDrawingBuffer: false });
  if (!gl) return null;

  let program: WebGLProgram;
  try {
    program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'link');
  } catch {
    return null;
  }
  gl.useProgram(program);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, 'a_pos');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = (name: string) => gl.getUniformLocation(program, name);
  gl.uniform1f(u('u_at'), options.at ?? 0.66);
  gl.uniform3f(u('u_dark'), ...options.dark);
  gl.uniform3f(u('u_light'), ...options.light);
  gl.uniform3f(u('u_foam'), ...options.foam);
  gl.uniform3f(u('u_shallow'), ...options.shallow);
  gl.uniform3f(u('u_deep'), ...options.deep);
  gl.uniform3f(u('u_echo'), ...options.echo);
  const uRes = u('u_res');
  const uTime = u('u_time');
  const dpr = options.dpr ?? 1;

  return {
    render(time) {
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    destroy() {
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
