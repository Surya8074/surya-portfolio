import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './orbital-carousel-hero.css';

/*
 * Adapted from the visual principles documented in CrazyGL's Multi-Screen Orbital Carousel.
 * Original guide: https://crazygl.com/hero/orbital-carousel
 * Original implementation by @ybouane: https://x.com/ybouane
 *
 * Cards currently use locally generated UI mockups so the orbital interaction can be built
 * before the real project screenshots are supplied. Add a public asset path to a screen's
 * src field below when those screenshots are ready.
 */

type ScreenDefinition = {
  product: string;
  title: string;
  tag: string;
  src?: string;
};

const SCREENS: ScreenDefinition[] = [
  { product: 'GENESIS', title: 'Test workspace', tag: 'AUTOMATION' },
  { product: 'GENESIS', title: 'Run configuration', tag: 'TEST SETUP' },
  { product: 'COMSKI', title: 'Your learning journey', tag: 'PERSONALISATION' },
  { product: 'COMSKI', title: 'Practice session', tag: 'COMMUNICATION' },
  { product: 'COMSKI', title: 'Feedback insights', tag: 'AI COACH' },
  { product: 'GENESIS', title: 'Execution report', tag: 'REPORTING' },
];

const ACCENTS = ['#4264ed', '#6656d8', '#3e8eae', '#4c68d9', '#9871dc', '#3f78a9'];

function roundedPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawPlaceholderScreen(screen: ScreenDefinition, index: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 960;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const accent = ACCENTS[index % ACCENTS.length];
  const softAccent = index % 2 === 0 ? '#edf0ff' : '#f0edff';
  roundedPath(ctx, 2, 2, 956, 636, 28);
  ctx.fillStyle = '#fbfcff';
  ctx.fill();
  ctx.save();
  ctx.clip();

  // Top bar and compact left navigation.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 960, 66);
  ctx.strokeStyle = '#e9ebf1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 65);
  ctx.lineTo(960, 65);
  ctx.stroke();

  roundedPath(ctx, 24, 19, 29, 29, 8);
  ctx.fillStyle = accent;
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 17px Inter, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(screen.product.charAt(0), 38.5, 39);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#242736';
  ctx.font = '700 18px Inter, Arial, sans-serif';
  ctx.fillText(screen.product === 'COMSKI' ? 'ComSki' : 'Genesis', 64, 39);

  ctx.fillStyle = '#f4f5fa';
  ctx.fillRect(0, 66, 172, 574);
  ctx.fillStyle = '#9ba0af';
  ctx.font = '700 10px Inter, Arial, sans-serif';
  ctx.fillText('WORKSPACE', 24, 100);

  const navItems = ['Overview', 'Projects', 'Activity', 'Reports'];
  navItems.forEach((item, i) => {
    const y = 120 + i * 45;
    if (i === index % navItems.length) {
      roundedPath(ctx, 13, y - 20, 146, 34, 8);
      ctx.fillStyle = softAccent;
      ctx.fill();
      ctx.fillStyle = accent;
    } else {
      ctx.fillStyle = '#727889';
    }
    ctx.font = (i === index % navItems.length ? '700 ' : '500 ') + '13px Inter, Arial, sans-serif';
    ctx.fillText(item, 34, y + 2);
  });

  const x = 204;
  ctx.fillStyle = '#868b9a';
  ctx.font = '500 11px Inter, Arial, sans-serif';
  ctx.fillText(screen.product + ' / ' + screen.tag, x, 100);
  ctx.fillStyle = '#222638';
  ctx.font = '700 27px Inter, Arial, sans-serif';
  ctx.fillText(screen.title, x, 142);
  ctx.fillStyle = '#878c9b';
  ctx.font = '400 13px Inter, Arial, sans-serif';
  ctx.fillText('A clearer view of work in progress.', x, 168);

  // Small stat cards.
  const metricLabels = index % 2 === 0
    ? ['Active projects', 'Completed', 'In progress']
    : ['Test coverage', 'Passed runs', 'Needs review'];
  const metricValues = index % 2 === 0 ? ['12', '08', '04'] : ['86%', '124', '06'];
  for (let i = 0; i < 3; i += 1) {
    const mx = x + i * 238;
    roundedPath(ctx, mx, 194, 218, 100, 12);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#e9ebf1';
    ctx.stroke();
    ctx.fillStyle = '#858a99';
    ctx.font = '500 12px Inter, Arial, sans-serif';
    ctx.fillText(metricLabels[i], mx + 17, 220);
    ctx.fillStyle = '#242736';
    ctx.font = '700 27px Inter, Arial, sans-serif';
    ctx.fillText(metricValues[i], mx + 17, 265);
    roundedPath(ctx, mx + 155, 210, 43, 7, 4);
    ctx.fillStyle = i === 1 ? '#c4e9de' : softAccent;
    ctx.fill();
  }

  // Main analytics panel with a chart and evidence rows.
  roundedPath(ctx, x, 316, 445, 274, 14);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = '#e9ebf1';
  ctx.stroke();
  ctx.fillStyle = '#2a2d3a';
  ctx.font = '700 15px Inter, Arial, sans-serif';
  ctx.fillText(index % 2 === 0 ? 'Activity overview' : 'Execution quality', x + 20, 347);
  ctx.fillStyle = '#979baa';
  ctx.font = '400 11px Inter, Arial, sans-serif';
  ctx.fillText('Last 7 days', x + 20, 368);

  const chartLeft = x + 27;
  const chartBottom = 541;
  const barWidth = 29;
  const barGap = 20;
  const heights = [72, 94, 62, 120, 85, 143, 108, 161];
  for (let i = 0; i < heights.length; i += 1) {
    roundedPath(ctx, chartLeft + i * (barWidth + barGap), chartBottom - heights[i], barWidth, heights[i], 7);
    ctx.fillStyle = i === 5 ? accent : softAccent;
    ctx.fill();
  }
  ctx.strokeStyle = '#f0f1f5';
  ctx.beginPath();
  ctx.moveTo(chartLeft, 418);
  ctx.lineTo(chartLeft + 385, 418);
  ctx.moveTo(chartLeft, 473);
  ctx.lineTo(chartLeft + 385, 473);
  ctx.stroke();
  ctx.fillStyle = '#9ba0ad';
  ctx.font = '400 10px Inter, Arial, sans-serif';
  ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach((day, i) => {
    ctx.fillText(day, chartLeft + 13 + i * 49, 563);
  });

  const sideX = x + 466;
  roundedPath(ctx, sideX, 316, 263, 274, 14);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = '#e9ebf1';
  ctx.stroke();
  ctx.fillStyle = '#2a2d3a';
  ctx.font = '700 15px Inter, Arial, sans-serif';
  ctx.fillText(index % 2 === 0 ? 'Recent activity' : 'Latest runs', sideX + 18, 347);

  const rowLabels = index % 2 === 0
    ? ['Workspace synced', 'Task completed', 'New project added', 'Review ready']
    : ['Validation passed', 'Run completed', 'Test updated', 'Evidence saved'];
  rowLabels.forEach((label, i) => {
    const ry = 383 + i * 48;
    ctx.beginPath();
    ctx.arc(sideX + 27, ry - 4, 7, 0, Math.PI * 2);
    ctx.fillStyle = i === 0 ? '#c4e9de' : softAccent;
    ctx.fill();
    ctx.fillStyle = '#4c5060';
    ctx.font = '500 10px Inter, Arial, sans-serif';
    ctx.fillText(label, sideX + 43, ry);
    ctx.fillStyle = '#a5a9b4';
    ctx.font = '400 9px Inter, Arial, sans-serif';
    ctx.fillText((i + 1) * 3 + 'm ago', sideX + 43, ry + 14);
    if (i < rowLabels.length - 1) {
      ctx.strokeStyle = '#f0f1f5';
      ctx.beginPath();
      ctx.moveTo(sideX + 17, ry + 22);
      ctx.lineTo(sideX + 245, ry + 22);
      ctx.stroke();
    }
  });

  ctx.restore();
  ctx.strokeStyle = '#e3e6ef';
  ctx.lineWidth = 2;
  roundedPath(ctx, 2, 2, 956, 636, 28);
  ctx.stroke();
  return canvas;
}

function createPlaceholderTexture(screen: ScreenDefinition, index: number): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(drawPlaceholderScreen(screen, index));
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

type RuntimeCard = {
  group: THREE.Group;
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>;
  material: THREE.MeshStandardMaterial;
  texture: THREE.Texture;
  screen: ScreenDefinition;
};

type RoundedUniforms = {
  uOrbitalCornerRadius: { value: number };
  uOrbitalAspect: { value: number };
};

export default function OrbitalCarouselHero({ onSeeWork }: { onSeeWork: () => void }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglAvailable(false);
      return;
    }

    let disposed = false;
    let dragging = false;
    let pointerStartX = 0;
    let yawAtDragStart = 0;
    let previousPointerX = 0;
    let previousPointerTime = 0;
    let angularVelocity = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;
    let frame = 0;
    let previousFrameTime = 0;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reducedMotion = motionPreference.matches;
    const imageTextures: THREE.Texture[] = [];
    const materials: THREE.MeshStandardMaterial[] = [];
    const radius = 2.22;
    const cardCount = SCREENS.length;
    const cardWidth = 2 * radius * Math.sin(Math.PI / cardCount) * 0.96;

    const width = Math.max(stage.clientWidth, 320);
    const height = Math.max(stage.clientHeight, 320);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0.38, 7.15);
    camera.lookAt(0, 0, 0);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(width, height, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0xffffff, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.className = 'orbital-canvas';
    stage.appendChild(renderer.domElement);
    setWebglAvailable(true);

    scene.add(new THREE.HemisphereLight(0xeaf0ff, 0x929ab0, 1.7));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.1);
    keyLight.position.set(-2.8, 4.2, 5.5);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x9bbeff, 0.7);
    fillLight.position.set(4, 1.5, -3);
    scene.add(fillLight);

    const ring = new THREE.Group();
    ring.rotation.set(-0.035, -Math.PI / 2, 0);
    scene.add(ring);
    const cards: RuntimeCard[] = [];
    const sharedGeometry = new THREE.PlaneGeometry(1, 1);
    const textureLoader = new THREE.TextureLoader();

    SCREENS.forEach((screen, index) => {
      const placeholder = createPlaceholderTexture(screen, index);
      imageTextures.push(placeholder);
      const material = new THREE.MeshStandardMaterial({
        map: placeholder,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: placeholder,
        emissiveIntensity: 0.19,
        roughness: 0.68,
        metalness: 0,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      material.userData.orbitalAspect = 960 / 640;
      material.onBeforeCompile = (shader) => {
        const uniforms: RoundedUniforms = {
          uOrbitalCornerRadius: { value: 0.035 },
          uOrbitalAspect: { value: Number(material.userData.orbitalAspect) || 1.5 },
        };
        shader.uniforms.uOrbitalCornerRadius = uniforms.uOrbitalCornerRadius;
        shader.uniforms.uOrbitalAspect = uniforms.uOrbitalAspect;
        material.userData.orbitalUniforms = uniforms;
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <common>',
          '#include <common>\nuniform float uOrbitalCornerRadius;\nuniform float uOrbitalAspect;',
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <map_fragment>',
          '#include <map_fragment>\n' +
            'vec2 orbitalP = (vUv - 0.5) * vec2(uOrbitalAspect, 1.0);\n' +
            'vec2 orbitalHalf = vec2(0.5 * uOrbitalAspect, 0.5);\n' +
            'float orbitalR = clamp(uOrbitalCornerRadius, 0.0, min(orbitalHalf.x, orbitalHalf.y));\n' +
            'vec2 orbitalD = abs(orbitalP) - (orbitalHalf - vec2(orbitalR));\n' +
            'float orbitalDist = length(max(orbitalD, 0.0)) + min(max(orbitalD.x, orbitalD.y), 0.0) - orbitalR;\n' +
            'float orbitalAA = max(fwidth(orbitalDist) * 1.5, 1e-4);\n' +
            'float orbitalMask = 1.0 - smoothstep(-orbitalAA, orbitalAA, orbitalDist);\n' +
            'if (orbitalMask <= 0.001) discard;\n' +
            'diffuseColor.a *= orbitalMask;',
        );
      };
      material.customProgramCacheKey = () => 'portfolio-orbital-rounded-card-v1';
      materials.push(material);

      const mesh = new THREE.Mesh(sharedGeometry, material);
      mesh.scale.set(cardWidth, cardWidth / 1.5, 1);
      const angle = (index / cardCount) * Math.PI * 2;
      const group = new THREE.Group();
      group.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      group.rotation.y = Math.atan2(group.position.x, group.position.z);
      group.add(mesh);
      ring.add(group);
      cards.push({ group, mesh, material, texture: placeholder, screen });

      // Replace the temporary designed UI with a real local screenshot whenever src is supplied.
      if (screen.src) {
        textureLoader.load(
          screen.src,
          (loadedTexture) => {
            if (disposed) {
              loadedTexture.dispose();
              return;
            }
            loadedTexture.colorSpace = THREE.SRGBColorSpace;
            loadedTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
            const image = loadedTexture.image as HTMLImageElement;
            const aspect = image.width && image.height ? image.width / image.height : 1.5;
            const previousTexture = cards[index]?.texture || placeholder;
            imageTextures.push(loadedTexture);
            material.map = loadedTexture;
            material.emissiveMap = loadedTexture;
            material.userData.orbitalAspect = aspect;
            const uniforms = material.userData.orbitalUniforms as RoundedUniforms | undefined;
            if (uniforms?.uOrbitalAspect) uniforms.uOrbitalAspect.value = aspect;
            material.needsUpdate = true;
            mesh.scale.y = mesh.scale.x / aspect;
            if (previousTexture !== loadedTexture) previousTexture.dispose();
            cards[index].texture = loadedTexture;
          },
          undefined,
          () => {
            // Keep the generated UI preview if an optional local screenshot is unavailable.
          },
        );
      }
    });

    const worldPosition = new THREE.Vector3();
    const clock = new THREE.Clock();
    const idleAngularSpeed = 0.11; // One gentle revolution in roughly 57 seconds.
    const dragSensitivity = 1.0;
    const momentumDecay = 0.94;
    const focusBoost = 1.12;
    const focusOpacityFalloff = 0.68;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      dragging = true;
      pointerStartX = event.clientX;
      yawAtDragStart = ring.rotation.y;
      previousPointerX = event.clientX;
      previousPointerTime = performance.now();
      angularVelocity = 0;
      renderer.domElement.style.cursor = 'grabbing';
      try {
        renderer.domElement.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture may not be available in embedded browser contexts.
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width > 0) {
        targetPointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        targetPointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      }
      if (!dragging) return;

      const now = performance.now();
      const elapsed = Math.max((now - previousPointerTime) / 1000, 0.008);
      const distance = event.clientX - previousPointerX;
      ring.rotation.y = yawAtDragStart + ((event.clientX - pointerStartX) / Math.max(rect.width, 1)) * dragSensitivity * Math.PI * 2;
      const sampledVelocity = (distance / Math.max(rect.width, 1)) * Math.PI * 2 / elapsed;
      angularVelocity = THREE.MathUtils.clamp(angularVelocity * 0.55 + sampledVelocity * 0.45, -4.5, 4.5);
      previousPointerX = event.clientX;
      previousPointerTime = now;
    };

    const onPointerUp = (event: PointerEvent) => {
      dragging = false;
      if (reducedMotion) angularVelocity = 0;
      renderer.domElement.style.cursor = 'grab';
      try {
        if (renderer.domElement.hasPointerCapture(event.pointerId)) {
          renderer.domElement.releasePointerCapture(event.pointerId);
        }
      } catch {
        // Safe to ignore if the browser already released the pointer.
      }
    };

    const onPointerLeave = () => {
      if (!dragging) {
        targetPointerX = 0;
        targetPointerY = 0;
      }
    };

    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointercancel', onPointerUp);
    renderer.domElement.addEventListener('pointerleave', onPointerLeave);

    const resizeObserver = new ResizeObserver(() => {
      if (disposed) return;
      const nextWidth = Math.max(stage.clientWidth, 320);
      const nextHeight = Math.max(stage.clientHeight, 320);
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight, false);
    });
    resizeObserver.observe(stage);

    const animate = (time: number) => {
      if (disposed) return;
      const delta = previousFrameTime === 0 ? clock.getDelta() : Math.min((time - previousFrameTime) / 1000, 0.05);
      previousFrameTime = time;

      if (!document.hidden) {
        if (!dragging) {
          if (!reducedMotion) ring.rotation.y += idleAngularSpeed * delta;
          ring.rotation.y += angularVelocity * delta;
          angularVelocity *= Math.pow(momentumDecay, delta * 60);
          if (Math.abs(angularVelocity) < 0.001) angularVelocity = 0;
        }

        const lerp = 1 - Math.exp(-7.5 * delta);
        let frontIndex = 0;
        let frontZ = -Infinity;
        cards.forEach((card, index) => {
          card.group.getWorldPosition(worldPosition);
          if (worldPosition.z > frontZ) {
            frontZ = worldPosition.z;
            frontIndex = index;
          }
        });

        cards.forEach((card, index) => {
          const focused = index === frontIndex;
          const targetScale = focused ? focusBoost : 1;
          const targetOpacity = focused ? 1 : focusOpacityFalloff;
          const targetEmission = focused ? 0.37 : 0.18;
          const currentScale = card.group.scale.x;
          const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, lerp);
          card.group.scale.setScalar(nextScale);
          card.material.opacity = THREE.MathUtils.lerp(card.material.opacity, targetOpacity, lerp);
          card.material.emissiveIntensity = THREE.MathUtils.lerp(card.material.emissiveIntensity, targetEmission, lerp);
        });

        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPointerX * 0.34, lerp);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.38 - targetPointerY * 0.16, lerp);
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('pointercancel', onPointerUp);
      renderer.domElement.removeEventListener('pointerleave', onPointerLeave);
      cards.forEach((card) => card.material.dispose());
      materials.forEach((material) => material.dispose());
      imageTextures.forEach((texture) => texture.dispose());
      sharedGeometry.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <section id='home' className='orbital-hero' aria-label='Product design portfolio introduction'>
      {/* This hero was inspired and implemented based on the implementation at https://crazygl.com/hero/orbital-carousel */}
      {/* Original implementation by @ybouane https://x.com/ybouane */}
      <div className='orbital-ambient orbital-ambient-one' aria-hidden='true' />
      <div className='orbital-ambient orbital-ambient-two' aria-hidden='true' />
      <div className='orbital-hero-content'>
        <p className='orbital-eyebrow'><span /> PRODUCT DESIGN · AI · DIGITAL EXPERIENCES</p>
        <h1>
          <span>Designing how products earn trust,</span>
          <span>across <em>visual, product &amp; growth.</em></span>
        </h1>
        <p className='orbital-hero-description'>Interfaces, systems and interactions designed with intent.</p>
        <button className='orbital-work-button' onClick={onSeeWork}>See my work <span aria-hidden='true'>↘</span></button>
      </div>

      <div className='orbital-stage' ref={stageRef} role='img' aria-label='Interactive 3D orbit of Genesis and ComSki interface previews. Drag to rotate the carousel.'>
        {!webglAvailable && (
          <div className='orbital-fallback'>
            {SCREENS.map((screen, index) => (
              <div className='orbital-fallback-card' key={screen.title}>
                <span>{screen.product}</span>
                <strong>{screen.title}</strong>
                <i>{String(index + 1).padStart(2, '0')}</i>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='orbital-instruction'><span className='orbital-drag-icon' aria-hidden='true'>↔</span> DRAG TO EXPLORE <i /> SCROLL TO VIEW SELECTED WORK</div>
    </section>
  );
}
