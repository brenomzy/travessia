/**
 * Seam engine: the dithered river seam from docs/design/texture-lab/gen5.mjs as a WebGL2 fragment shader, so it
 * can move. Framework-agnostic (SPEC §5.4 rule 7): no React, no Astro, no Motion.
 *
 * It draws one canvas pixel per dither cell (the texture's 6 px cells), and the page scales the canvas up with
 * `image-rendering: pixelated`, so a 2880×1800 seam costs a 480×300 draw. With `time = 0` and no motion it
 * reproduces the approved PNG: same Perlin noise and the same permutation table (Park–Miller, seed 7), same fbm,
 * domain warp, boundary, gain and 4×4 Bayer matrix. Only float32 rounding can flip a cell right on a threshold.
 *
 * Motion ideas, each a multiplier so 0 turns it off:
 * - flow: the noise field slides along the seam (downstream), so the shoreline keeps changing shape.
 * - drift: the warp's second lookup moves, so the shape churns in place without travelling.
 * - breathe: the warp amplitude swells and settles, so the mixing zone widens and narrows.
 * - shimmer: the dither matrix steps a cell at a time, so dots in the mixing zone twinkle.
 */

export type SeamMotion = {
  /** Noise units per second along the seam. 0.03 crosses the full height in about a minute. */
  flow: number;
  /** Noise units per second added to the warp lookup. */
  drift: number;
  /** Fraction the warp amplitude swings, e.g. 0.15 for ±15%. */
  breathe: number;
  /** Dither steps per second. 0 keeps the matrix still. */
  shimmer: number;
};

export type SeamRecipe = {
  /** Texture size in pixels, as in the PNG (e.g. 2880×1800). */
  width: number;
  height: number;
  /** Dither cell in texture pixels (6 for the seams). */
  cell: number;
  /** Seam centre line, 0–1 across the width. */
  at: number;
  /** Warp amplitude (0.16 for seam-40/50, 0.12 for seam-cta). */
  amp: number;
  /** Two flat colours as [r, g, b] 0–255: left (dark) and right (light). */
  dark: [number, number, number];
  light: [number, number, number];
  motion: SeamMotion;
};

export const STILL: SeamMotion = { flow: 0, drift: 0, breathe: 0, shimmer: 0 };

/** Named motion presets for the styleguide comparison. The site uses `river`. */
export const MOTION_PRESETS: Record<string, SeamMotion> = {
  still: STILL,
  flow: { flow: 0.035, drift: 0, breathe: 0, shimmer: 0 },
  drift: { flow: 0, drift: 0.05, breathe: 0, shimmer: 0 },
  breathe: { flow: 0, drift: 0, breathe: 0.2, shimmer: 0 },
  shimmer: { flow: 0, drift: 0, breathe: 0, shimmer: 2 },
  river: { flow: 0.025, drift: 0.015, breathe: 0.08, shimmer: 0 },
};

/** The Park–Miller shuffle gen5.mjs uses for its permutation table (256 entries; perm[i] = p[i & 255]). */
export function permutation(seed = 7): Uint8Array {
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  return Uint8Array.from(p);
}

const VERT = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
precision highp int;
uniform highp usampler2D u_perm;
uniform vec2 u_cells;      // canvas size in cells
uniform float u_cellUV;    // one cell as a fraction of texture width (cell / width)
uniform float u_cellV;     // one cell as a fraction of texture height (cell / height)
uniform float u_aspect;    // texture width / height
uniform float u_at;
uniform float u_amp;
uniform float u_time;
uniform vec4 u_motion;     // flow, drift, breathe, shimmer
uniform vec3 u_dark;
uniform vec3 u_light;
out vec4 outColor;

int perm(int i) { return int(texelFetch(u_perm, ivec2(i & 255, 0), 0).r); }
float grad(int h, float x, float y) {
  int g = h & 7;
  float u = g < 4 ? x : y;
  float v = g < 4 ? y : x;
  return ((g & 1) != 0 ? -u : u) + ((g & 2) != 0 ? -2.0 * v : 2.0 * v);
}
float fade(float t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }
float noise(float x, float y) {
  float fx = floor(x), fy = floor(y);
  int X = int(fx) & 255, Y = int(fy) & 255;
  x -= fx; y -= fy;
  float u = fade(x), v = fade(y);
  int a = perm(X) + Y, b = perm(X + 1) + Y;
  float l1 = grad(perm(a), x, y) + u * (grad(perm(b), x - 1.0, y) - grad(perm(a), x, y));
  float l2 = grad(perm(a + 1), x, y - 1.0) + u * (grad(perm(b + 1), x - 1.0, y - 1.0) - grad(perm(a + 1), x, y - 1.0));
  return (l1 + v * (l2 - l1)) * 0.5;
}
float fbm(float x, float y) {
  float s = 0.0, a = 0.5, f = 1.0;
  for (int i = 0; i < 5; i++) { s += a * noise(x * f, y * f); f *= 2.0; a *= 0.5; }
  return s;
}
const float BAYER[16] = float[16](0., 8., 2., 10., 12., 4., 14., 6., 3., 11., 1., 9., 15., 7., 13., 5.);

void main() {
  // gl_FragCoord is bottom-up; the texture is top-down.
  int cx = int(gl_FragCoord.x);
  int cy = int(u_cells.y) - 1 - int(gl_FragCoord.y);
  float uu = float(cx) * u_cellUV;
  float vv = float(cy) * u_cellV;

  float px = vv * 1.6 / u_aspect * 2.2 - u_time * u_motion.x; // minus: the pattern travels down
  float py = uu * 1.6 * 2.2;
  float qx = fbm(px, py * 2.5);
  float qy = fbm(px + 5.2, py * 2.5 + 1.3);
  float d = u_time * u_motion.y;
  float warp = fbm(px + 4.0 * qx + d, py * 2.5 + 4.0 * qy - d * 0.6);
  float amp = u_amp * (1.0 + u_motion.z * sin(u_time * 0.35));
  float boundary = (uu - u_at) + warp * amp + sin(vv * 4.0 + 1.0) * 0.012;
  float f = clamp(0.5 + boundary * 9.0 + warp * 0.2, 0.0, 1.0);

  int k = int(floor(u_time * u_motion.w));
  int bi = ((cy + k) % 4) * 4 + ((cx + k * 3) % 4);
  float threshold = (BAYER[bi] + 0.5) / 16.0;
  outColor = vec4((f > threshold ? u_light : u_dark) / 255.0, 1.0);
}`;

export type SeamRenderer = {
  /** Draws one frame at `time` seconds. */
  render(time: number): void;
  /** Swaps the motion settings without rebuilding. */
  setMotion(motion: SeamMotion): void;
  destroy(): void;
};

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? 'shader');
  return sh;
}

/**
 * Sets the canvas to one pixel per cell and returns a renderer, or null when WebGL2 isn't available
 * (the caller keeps the PNG).
 */
export function createSeamRenderer(canvas: HTMLCanvasElement, recipe: SeamRecipe): SeamRenderer | null {
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, preserveDrawingBuffer: false });
  if (!gl) return null;

  const cols = Math.ceil(recipe.width / recipe.cell);
  const rows = Math.ceil(recipe.height / recipe.cell);
  canvas.width = cols;
  canvas.height = rows;

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

  const tex = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8UI, 256, 1, 0, gl.RED_INTEGER, gl.UNSIGNED_BYTE, permutation(7));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  const u = (name: string) => gl.getUniformLocation(program, name);
  gl.uniform1i(u('u_perm'), 0);
  gl.uniform2f(u('u_cells'), cols, rows);
  gl.uniform1f(u('u_cellUV'), recipe.cell / recipe.width);
  gl.uniform1f(u('u_cellV'), recipe.cell / recipe.height);
  gl.uniform1f(u('u_aspect'), recipe.width / recipe.height);
  gl.uniform1f(u('u_at'), recipe.at);
  gl.uniform1f(u('u_amp'), recipe.amp);
  gl.uniform3f(u('u_dark'), ...recipe.dark);
  gl.uniform3f(u('u_light'), ...recipe.light);
  const uTime = u('u_time');
  const uMotion = u('u_motion');

  const setMotion = (m: SeamMotion) => gl.uniform4f(uMotion, m.flow, m.drift, m.breathe, m.shimmer);
  setMotion(recipe.motion);
  gl.viewport(0, 0, cols, rows);

  return {
    render(time) {
      gl.uniform1f(uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    setMotion,
    destroy() {
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
