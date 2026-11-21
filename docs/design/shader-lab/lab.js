// Shared runtime for the shader lab pages. Each page sets window.SHADERS, then loads this file.
window.COMMON = `
#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform float uDpr;
const vec3 DARK = vec3(15., 28., 36.) / 255.;
const vec3 D600 = vec3(42., 62., 72.) / 255.;
const vec3 LIGHT = vec3(0., 201., 155.) / 255.;
const vec3 L200 = vec3(149., 241., 207.) / 255.;
const vec3 L300 = vec3(83., 228., 183.) / 255.;
const vec3 DEEP = vec3(14., 107., 82.) / 255.;
const vec3 D800 = vec3(14., 72., 55.) / 255.;
const vec3 WHITE = vec3(1.);
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
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
float fbm(vec3 p) { float s = 0., a = .5; for (int i = 0; i < 5; i++) { s += a * snoise(p); p = p * 2.02 + 17.1; a *= .5; } return s; }
float fbm3(vec3 p) { float s = 0., a = .5; for (int i = 0; i < 3; i++) { s += a * snoise(p); p = p * 2.02 + 17.1; a *= .5; } return s; }
float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2. + a.y * a.y * .75); }
float bayer4(vec2 a) { return bayer2(.5 * a) * .25 + bayer2(a); }
float grain(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
`;
const COMMON = window.COMMON;

const VERT = 'attribute vec2 a; void main(){ gl_Position = vec4(a, 0., 1.); }';
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let playing = !reduce, speed = 1, clock = 0, last = performance.now();
const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
const tiles = [];

function makeTile(s) {
  const fig = document.createElement('figure');
  fig.innerHTML = `<div class="stage" data-id="${s.id}"><canvas></canvas>
    <div class="hero"><div class="h">Your client pays in dollars. <span>You get paid in reais.</span></div>
    <div class="p">The invoice goes out in English. The Pix arrives in Portuguese, with the fee and the rate already worked out.</div>
    <div class="f"><i>Your email</i><b>Join the waitlist</b></div></div></div>
    <figcaption><h2>${s.title}</h2><p>${s.note}</p><p class="ref">${s.ref}</p></figcaption>`;
  document.getElementById('grid').append(fig);
  const stage = fig.querySelector('.stage');
  const canvas = fig.querySelector('canvas');
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
  gl.getExtension('OES_standard_derivatives');
  const sh = (type, src) => { const o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; };
  let prog;
  try {
    prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, COMMON + s.frag));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  } catch (e) {
    console.error(s.id, e.message);
    stage.insertAdjacentHTML('beforeend', `<div class="err">${s.id}: ${e.message}</div>`);
    return;
  }
  gl.useProgram(prog);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const u = { res: gl.getUniformLocation(prog, 'uRes'), time: gl.getUniformLocation(prog, 'uTime'), dpr: gl.getUniformLocation(prog, 'uDpr') };
  const tile = { s, stage, canvas, gl, u, visible: false, drawn: false };
  new IntersectionObserver(([e]) => { tile.visible = e.isIntersecting; }).observe(stage);
  stage.addEventListener('click', () => { stage.classList.toggle('full'); tile.drawn = false; });
  tiles.push(tile);
}

function draw(tile) {
  const { canvas, gl, u } = tile;
  const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
  if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
  gl.viewport(0, 0, w, h);
  gl.uniform2f(u.res, w, h); gl.uniform1f(u.time, clock + 40); gl.uniform1f(u.dpr, dpr);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  tile.drawn = true;
}

function frame(now) {
  const dt = Math.min(now - last, 100) / 1000; last = now;
  if (playing) clock += dt * speed;
  for (const t of tiles) if (t.visible && (playing || !t.drawn)) draw(t);
  requestAnimationFrame(frame);
}

window.SHADERS.forEach(makeTile);
requestAnimationFrame(frame);
addEventListener('resize', () => tiles.forEach((t) => (t.drawn = false)));
addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelectorAll('.stage.full').forEach((s) => s.classList.remove('full')); });

const playBtn = document.getElementById('play');
const setPlay = (v) => { playing = v; playBtn.setAttribute('aria-pressed', String(v)); playBtn.textContent = v ? 'Playing' : 'Paused'; };
setPlay(playing);
playBtn.onclick = () => setPlay(!playing);
const heroBtn = document.getElementById('hero');
heroBtn.onclick = () => { const on = document.body.classList.toggle('show-hero'); heroBtn.setAttribute('aria-pressed', String(on)); };
const speedBtn = document.getElementById('speed');
const speeds = [1, 4, 0.5];
speedBtn.onclick = () => { speed = speeds[(speeds.indexOf(speed) + 1) % speeds.length]; speedBtn.textContent = `Speed ×${speed}`; speedBtn.setAttribute('aria-pressed', String(speed !== 1)); };

// Second line of the hero headline: compare solid colours with the old 55% white.
const SECOND = [
  ['55% white', 'rgb(255 255 255 / 0.55)'],
  ['Fog #A8B6BC', '#A8B6BC'],
  ['Silver #C9D2D6', '#C9D2D6'],
  ['Igarap\u00e9-100 #CCF7E5', '#CCF7E5'],
  ['Igarap\u00e9-300 #53E4B7', '#53E4B7'],
];
const controls = document.querySelector('.controls');
const label = document.createElement('span');
label.className = 'ctl-label'; label.textContent = 'Second line:';
controls.append(label);
SECOND.forEach(([name, value], i) => {
  const b = document.createElement('button');
  b.className = 'ctl'; b.textContent = name; b.dataset.second = value;
  b.setAttribute('aria-pressed', String(i === 1));
  b.onclick = () => {
    document.body.style.setProperty('--second', value);
    controls.querySelectorAll('[data-second]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    if (!document.body.classList.contains('show-hero')) document.getElementById('hero').click();
  };
  controls.append(b);
});
document.body.style.setProperty('--second', SECOND[1][1]);
