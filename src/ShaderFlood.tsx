import React, { useEffect, useRef } from 'react';

type Props = { active: boolean; colors: [string, string, string] };

const vertex = `
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

const fragment = `
precision highp float;
uniform vec2 res;
uniform vec2 pointer;
uniform float time;
uniform float strength;
uniform vec3 c1;
uniform vec3 c2;
uniform vec3 c3;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += noise(p) * a;
    p = p * 2.02 + vec2(13.7, 8.3);
    a *= 0.5;
  }
  return v;
}
void main() {
  vec2 uv = gl_FragCoord.xy / res;
  float aspect = res.x / res.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 mouse = (pointer - 0.5) * vec2(aspect, 1.0);
  float t = time * 0.20;

  vec2 delta = p - mouse;
  float distanceToPointer = length(delta);
  float influence = exp(-distanceToPointer * 2.15) * strength;
  float angle = atan(delta.y, delta.x);
  vec2 swirl = vec2(cos(angle + 1.7), sin(angle + 1.7));
  vec2 flow = vec2(
    sin(p.y * 3.0 - t * 1.7) + cos(p.x * 2.2 + t),
    cos(p.x * 2.7 - t * 1.25) + sin(p.y * 2.0 + t * 0.8)
  ) * 0.12;
  vec2 warped = p + flow + swirl * influence * 0.34;
  float n1 = fbm(warped * 3.2 + vec2(t * 0.8, -t * 0.55));
  float n2 = fbm(warped * 5.4 - vec2(t * 0.45, t * 0.7));
  float ribbons = sin(warped.x * 5.0 + warped.y * 3.2 + n1 * 5.0 - t * 2.0
                      + influence * 4.0);
  float field = n1 * 0.58 + n2 * 0.28 + ribbons * 0.14;
  float bands = smoothstep(0.20, 0.82, field + 0.12);
  vec3 color = mix(c1, c2, smoothstep(0.12, 0.72, bands + n2 * 0.32));
  color = mix(color, c3, smoothstep(0.55, 0.96, n1 * 0.72 + bands * 0.35));
  float highlight = pow(max(0.0, 1.0 - abs(ribbons)), 9.0);
  color += highlight * 0.16;
  float ripple = exp(-abs(distanceToPointer - (0.12 + mod(time * 0.22, 0.48))) * 34.0)
                 * influence;
  color += ripple * 0.12;

  // The liquid is a continuous full-card surface; only its intensity eases in/out.
  gl_FragColor = vec4(color, 0.88 * strength);
}
`;

function hex(value: string): [number, number, number] {
  const v = value.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16) / 255) as [number, number, number];
}

export function ShaderFloodLayer({ active, colors }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  const wakeRef = useRef<() => void>(() => {});
  const pointer = useRef<[number, number]>([0.5, 0.5]);

  useEffect(() => {
    activeRef.current = active;
    if (active) wakeRef.current();
  }, [active]);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const gl = el.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, vertex);
    const fs = compile(gl.FRAGMENT_SHADER, fragment);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'p');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const uRes = uniform('res');
    const uPointer = uniform('pointer');
    const uTime = uniform('time');
    const uStrength = uniform('strength');
    const parsed = colors.map(hex);
    gl.uniform3fv(uniform('c1'), parsed[0]);
    gl.uniform3fv(uniform('c2'), parsed[1]);
    gl.uniform3fv(uniform('c3'), parsed[2]);

    const resize = () => {
      const rect = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      el.width = Math.max(1, Math.round(rect.width * dpr));
      el.height = Math.max(1, Math.round(rect.height * dpr));
      gl.viewport(0, 0, el.width, el.height);
      gl.uniform2f(uRes, el.width, el.height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    resize();

    let frame = 0;
    let strength = 0;
    const start = performance.now();
    let disposed = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const draw = (now: number) => {
      if (disposed) return;
      strength += ((activeRef.current ? 1 : 0) - strength) * 0.075;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uPointer, pointer.current[0], pointer.current[1]);
      gl.uniform1f(uTime, reducedMotion ? 0 : (now - start) / 1000);
      gl.uniform1f(uStrength, strength);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (activeRef.current || strength > 0.012) {
        frame = requestAnimationFrame(draw);
      } else {
        frame = 0;
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    wakeRef.current = wake;

    const track = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (event.clientX >= rect.left && event.clientX <= rect.right &&
          event.clientY >= rect.top && event.clientY <= rect.bottom) {
        pointer.current = [
          (event.clientX - rect.left) / rect.width,
          1 - (event.clientY - rect.top) / rect.height,
        ];
        wake();
      }
    };
    window.addEventListener('pointermove', track, { passive: true });
    wake();

    return () => {
      disposed = true;
      wakeRef.current = () => {};
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', track);
      observer.disconnect();
      if (buffer) gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [colors]);

  return <div className="tw-shader-layer" aria-hidden="true"><canvas ref={canvas} /></div>;
}
