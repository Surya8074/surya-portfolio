import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './cv6-particle-backdrop.css';

/** Lightweight interactive particle field for the ComSki hero backdrop. */
export default function CV6ParticleBackdrop() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 700px)').matches;
    const count = mobile ? 420 : 1050;
    let raf = 0;
    let visible = true;
    let disposed = false;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 2;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.2 : 1.6));
    renderer.setSize(Math.max(1, host.clientWidth), Math.max(1, host.clientHeight));
    renderer.setClearColor(0xffffff, 0);
    renderer.domElement.className = 'cv6-particle-canvas';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const sizes = new Float32Array(count);
    let seed = 87123;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    for (let i = 0; i < count; i++) {
      const j = i * 3;
      positions[j] = (rand() - 0.5) * 2.25;
      positions[j + 1] = (rand() - 0.5) * 1.85;
      positions[j + 2] = (rand() - 0.5) * 0.25;
      phases[i] = rand() * Math.PI * 2;
      sizes[i] = 0.7 + rand() * 1.2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uPointer: { value: new THREE.Vector2(10, 10) },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uBlue: { value: new THREE.Color('#3B5BDB') },
        uWarm: { value: new THREE.Color('#FF8A45') },
      },
      vertexShader: `
        attribute float aPhase;
        attribute float aSize;
        uniform float uTime;
        uniform float uMorph;
        uniform vec2 uPointer;
        uniform float uPixelRatio;
        varying float vAlpha;
        varying float vWarm;
        void main() {
          vec3 p = position;
          float t = uTime * 0.16;
          vec3 arranged = vec3(position.x * 0.78, position.y * 0.72 + sin(position.x * 3.0 + aPhase) * 0.055, position.z);
          p = mix(position, arranged, uMorph);
          p.x += sin(t + aPhase) * 0.018;
          p.y += cos(t * 0.8 + aPhase * 1.7) * 0.022;
          vec2 delta = p.xy - uPointer;
          float dist = length(delta);
          float influence = 1.0 - smoothstep(0.0, 0.42, dist);
          if (dist > 0.0001) p.xy += normalize(delta) * influence * 0.20;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = clamp(aSize * uPixelRatio * 1.35, 1.0, 3.0);
          vAlpha = (0.48 + 0.42 * (1.0 - smoothstep(-0.3, 0.5, p.z))) * (0.82 + 0.18 * sin(uTime * 0.8 + aPhase));
          vWarm = step(0.92, fract(aPhase * 0.159));
        }
      `,
      fragmentShader: `
        uniform vec3 uBlue;
        uniform vec3 uWarm;
        varying float vAlpha;
        varying float vWarm;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float alpha = 1.0 - smoothstep(0.16, 0.5, d);
          if (alpha < 0.02) discard;
          gl_FragColor = vec4(mix(uBlue, uWarm, vWarm), alpha * vAlpha * 0.88);
        }
      `,
    });
    scene.add(new THREE.Points(geometry, material));

    const pointer = new THREE.Vector2(10, 10);
    const target = new THREE.Vector2(10, 10);
    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      const y = -(((event.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1);
      target.set(x * (rect.width / Math.max(1, rect.height)), y);
    };
    const onLeave = () => target.set(10, 10);
    host.addEventListener('pointermove', onMove, { passive: true });
    host.addEventListener('pointerleave', onLeave, { passive: true });

    const resize = () => {
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      renderer.setSize(width, height);
      const aspect = width / height;
      camera.left = -aspect;
      camera.right = aspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
      material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    visibilityObserver.observe(host);
    const onVisibility = () => { visible = !document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);
    const clock = new THREE.Clock();
    const animate = () => {
      if (disposed) return;
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      pointer.lerp(target, 0.055);
      const elapsed = clock.getElapsedTime();
      material.uniforms.uTime.value = reducedMotion ? 0 : elapsed;
      const cycle = reducedMotion ? 0 : (Math.sin(elapsed * 0.22 - Math.PI / 2) + 1) / 2;
      material.uniforms.uMorph.value = cycle * cycle * (3 - 2 * cycle);
      material.uniforms.uPointer.value.copy(pointer);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="cv6-particle-backdrop" aria-hidden="true" />;
}
