import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const MODEL_URL = 'https://raw.githubusercontent.com/AnubhavChaturvedi-GitHub/macbook-pro-threejs/main/MacBook%20Pro.glb';
const SCREEN_URL = '/surya-portfolio/genesis/Dashboard.webp';

export default function GenesisMacBook() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Group | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
    camera.position.set(12.5, 8.2, 22.5);
    camera.lookAt(0, 3.8, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0xffffff, 0);
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    root.scale.setScalar(0.33);
    root.rotation.y = -0.12;
    scene.add(root);
    sceneRef.current = root;

    scene.add(new THREE.HemisphereLight(0xffffff, 0x8f9298, 2.3));
    const key = new THREE.DirectionalLight(0xffffff, 4.2);
    key.position.set(7, 14, 12);
    key.castShadow = true;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdde8ff, 2.0);
    fill.position.set(-10, 7, 8);
    scene.add(fill);

    const loader = new GLTFLoader();
    let cancelled = false;
    loader.load(MODEL_URL, (gltf) => {
      if (cancelled) return;
      const model = gltf.scene;
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((material) => {
            if ('metalness' in material) material.metalness = Math.min(1, Number(material.metalness) || 0.3);
            if ('roughness' in material) material.roughness = Math.max(0.22, Number(material.roughness) || 0.35);
          });
        }
      });
      root.add(model);

      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(SCREEN_URL, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        const screenMaterial = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });

        // The reference model is authored in centimetres. This plane sits just above
        // the real display surface, following the same open-lid perspective.
        const screen = new THREE.Mesh(new THREE.PlaneGeometry(30.0, 19.48), screenMaterial);
        screen.position.set(0, 10.0, -0.12);
        screen.rotation.x = -0.075;
        screen.name = 'GenesisScreen';
        root.add(screen);
      });
      setLoading(false);
    }, undefined, () => {
      if (!cancelled) setLoading(false);
    });

    const resize = () => {
      const width = mount.clientWidth || 700;
      const height = mount.clientHeight || 650;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const target = targetRef.current;
      root.rotation.x += ((target.y * -0.035) - root.rotation.x) * 0.08;
      root.rotation.y += ((-0.12 + target.x * 0.055) - root.rotation.y) * 0.08;
      root.position.x += (target.x * 0.28 - root.position.x) * 0.08;
      root.position.y += (-target.y * 0.12 - root.position.y) * 0.08;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const mats = Array.isArray(object.material) ? object.material : [object.material];
          mats.forEach((m) => {
            if (m.map) m.map.dispose();
            m.dispose();
          });
        }
      });
      sceneRef.current = null;
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    targetRef.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    targetRef.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  const reset = () => { targetRef.current.x = 0; targetRef.current.y = 0; };

  return (
    <div className="genesis-3d-laptop" ref={mountRef} onPointerMove={handlePointerMove} onPointerLeave={reset}>
      {loading && <div className="genesis-3d-loading">Loading MacBook</div>}
    </div>
  );
}
