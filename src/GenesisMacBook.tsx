import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const SCREEN_URL = '/surya-portfolio/genesis/Reports.webp';

const MAC = {
  width: 31.26,
  depth: 22.12,
  baseHeight: 1.12,
  lidWidth: 30.9,
  lidHeight: 20.55,
  lidDepth: 0.62,
  screenWidth: 29.55,
  screenHeight: 19.18,
};

const roundedBox = (w: number, h: number, d: number, r: number, segments = 5) =>
  new RoundedBoxGeometry(w, h, d, segments, r);

const material = (color: number, roughness: number, metalness: number) =>
  new THREE.MeshPhysicalMaterial({
    color,
    roughness,
    metalness,
    clearcoat: 0.12,
    clearcoatRoughness: 0.4,
  });

function addKeyboard(root: THREE.Group) {
  const keyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x141519,
    roughness: 0.72,
    metalness: 0.02,
  });

  const rows = [
    [12, 1.65],
    [13, 1.7],
    [13, 1.7],
    [12, 1.75],
    [11, 1.8],
    [10, 1.9],
  ];

  const keyDepth = 1.55;
  const rowGap = 0.34;
  const startZ = -6;

  rows.forEach(([count, keyWidth], row) => {
    const gap = 0.24;
    const total = count * keyWidth + (count - 1) * gap;
    const startX = -total / 2;
    const z = startZ + row * (keyDepth + rowGap);

    for (let i = 0; i < count; i += 1) {
      const key = new THREE.Mesh(
        roundedBox(keyWidth, 0.11, keyDepth, 0.16, 3),
        keyMaterial,
      );
      key.position.set(startX + keyWidth / 2 + i * (keyWidth + gap), 1.27, z);
      key.castShadow = true;
      root.add(key);
    }
  });

  const trackpad = new THREE.Mesh(
    roundedBox(12.9, 0.08, 8.1, 0.55, 5),
    new THREE.MeshPhysicalMaterial({
      color: 0xc0c3c8,
      roughness: 0.2,
      metalness: 0.3,
      clearcoat: 0.7,
      clearcoatRoughness: 0.08,
    }),
  );
  trackpad.position.set(0, 1.18, 6.25);
  root.add(trackpad);
}

export default function GenesisMacBook() {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 180);
    camera.position.set(38, 17, 78);
    camera.lookAt(0, 6.3, -0.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.45));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xffffff, 0);
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    root.rotation.set(0.01, -0.10, 0);
    scene.add(root);

    const body = material(0xbfc2c7, 0.34, 0.58);
    const edge = material(0xd9dce0, 0.24, 0.75);
    const black = new THREE.MeshPhysicalMaterial({
      color: 0x090a0d,
      roughness: 0.2,
      metalness: 0.1,
      clearcoat: 0.85,
      clearcoatRoughness: 0.08,
    });

    const base = new THREE.Mesh(
      roundedBox(MAC.width, MAC.baseHeight, MAC.depth, 1.05, 6),
      body,
    );
    base.position.y = 0.56;
    base.castShadow = true;
    base.receiveShadow = true;
    root.add(base);

    const deck = new THREE.Mesh(
      roundedBox(MAC.width - 0.22, 0.20, MAC.depth - 0.22, 0.94, 5),
      edge,
    );
    deck.position.y = 1.10;
    deck.castShadow = true;
    root.add(deck);
    addKeyboard(root);

    // The lid owns the display plane. This is what keeps the dashboard
    // perfectly registered to the physical screen during 3D rotation.
    const lid = new THREE.Group();
    lid.position.set(0, 1.12, -MAC.depth / 2 + 1.05);
    lid.rotation.x = -THREE.MathUtils.degToRad(8);
    root.add(lid);

    const lidShell = new THREE.Mesh(
      roundedBox(MAC.lidWidth, MAC.lidHeight, MAC.lidDepth, 1.05, 6),
      body,
    );
    lidShell.position.y = MAC.lidHeight / 2;
    lidShell.castShadow = true;
    lidShell.receiveShadow = true;
    lid.add(lidShell);

    const bezel = new THREE.Mesh(
      roundedBox(MAC.lidWidth - 0.34, MAC.lidHeight - 0.34, 0.12, 0.82, 6),
      black,
    );
    bezel.position.set(0, MAC.lidHeight / 2, MAC.lidDepth / 2 + 0.045);
    lid.add(bezel);

    let disposed = false;

    // Add the display immediately so the 3D laptop renders on the first frame.
    // The Genesis result/report screen is applied asynchronously when it arrives.
    const screenMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      toneMapped: false,
    });
    const screen = new THREE.Mesh(
      roundedBox(MAC.screenWidth, MAC.screenHeight, 0.045, 0.34, 5),
      screenMaterial,
    );
    screen.position.set(0, MAC.lidHeight / 2 - 0.06, MAC.lidDepth / 2 + 0.125);
    screen.name = 'GenesisDisplay';
    lid.add(screen);

    const notch = new THREE.Mesh(
      roundedBox(3.2, 0.88, 0.07, 0.24, 4),
      new THREE.MeshBasicMaterial({ color: 0x050609 }),
    );
    notch.position.set(0, MAC.lidHeight - 0.52, MAC.lidDepth / 2 + 0.16);
    lid.add(notch);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(SCREEN_URL, (texture) => {
      if (disposed) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
      screenMaterial.map = texture;
      screenMaterial.needsUpdate = true;
    });

    const keyLight = new THREE.DirectionalLight(0xffffff, 4);
    keyLight.position.set(10, 24, 22);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 90;
    keyLight.shadow.camera.left = -35;
    keyLight.shadow.camera.right = 35;
    keyLight.shadow.camera.top = 35;
    keyLight.shadow.camera.bottom = -35;
    scene.add(keyLight);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x89909b, 2.4));

    const rim = new THREE.DirectionalLight(0xe7edff, 1.4);
    rim.position.set(-22, 12, -20);
    scene.add(rim);

    const front = new THREE.DirectionalLight(0xffffff, 0.8);
    front.position.set(12, 8, 28);
    scene.add(front);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(90, 90).rotateX(-Math.PI / 2),
      new THREE.ShadowMaterial({ opacity: 0.12 }),
    );
    floor.position.y = -0.12;
    floor.receiveShadow = true;
    scene.add(floor);

    const resize = () => {
      const width = mount.clientWidth || 720;
      const height = mount.clientHeight || 680;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    let frame = 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      frame = requestAnimationFrame(animate);

      if (!reduceMotion) {
        const target = targetRef.current;
        root.rotation.x += ((0.01 + target.y * -0.012) - root.rotation.x) * 0.07;
        root.rotation.y += ((-0.10 + target.x * 0.022) - root.rotation.y) * 0.07;
        root.position.x += (target.x * 0.18 - root.position.x) * 0.07;
        root.position.y += (-target.y * 0.08 - root.position.y) * 0.07;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.dispose();

      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((mat) => {
          if (mat.map) mat.map.dispose();
          mat.dispose();
        });
      });

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    targetRef.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    targetRef.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  const reset = () => {
    targetRef.current.x = 0;
    targetRef.current.y = 0;
  };

  return (
    <div
      className="genesis-3d-laptop"
      ref={mountRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      aria-hidden="true"
    >

    </div>
  );
}
