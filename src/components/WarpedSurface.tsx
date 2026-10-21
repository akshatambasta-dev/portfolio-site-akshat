import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MouseBus } from './Cursor';

const VERTEX_SHADER = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Inward-bending curved surface
    float curvature = sin(uv.x * 3.14159) * sin(uv.y * 3.14159);
    pos.z -= (1.0 - curvature) * 0.42;

    // Fluid undulating displacement waves
    float wave1 = sin(pos.x * 3.0 + uTime * 1.1) * cos(pos.y * 3.0 + uTime * 0.85) * 0.1;
    float wave2 = sin(pos.x * 5.5 - uTime * 1.4 + pos.y * 3.5) * 0.04;

    // Cursor interaction ripple
    float mouseDist = distance(uv, uMouse);
    float mouseRipple = sin(mouseDist * 16.0 - uTime * 3.5) * exp(-mouseDist * 3.2) * 0.15 * uHover;

    pos.z += wave1 + wave2 + mouseRipple;
    vElevation = pos.z;

    vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
    vNormal = normalize(normalMatrix * normal);
  }
`;

const FRAGMENT_SHADER = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vElevation;

  void main() {
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.6);

    vec3 baseDark = vec3(0.03, 0.03, 0.035);
    vec3 baseLight = vec3(0.14, 0.14, 0.16);
    vec3 surface = mix(baseDark, baseLight, vElevation * 2.0 + 0.5);

    // Deep red accent & cyan chromatic edge
    vec3 deepRed = vec3(0.63, 0.07, 0.07);
    vec3 cyanGlow = vec3(0.12, 0.75, 0.85);

    vec3 color = surface;
    color += fresnel * deepRed * 1.6;
    color += pow(fresnel, 4.0) * cyanGlow * 0.8;

    // Delicate procedural coordinate grid
    vec2 gridUv = fract(vUv * 24.0);
    float gridLine = step(0.965, gridUv.x) + step(0.965, gridUv.y);
    color += gridLine * vec3(0.07);

    // Inward-bending boundary vignette
    float edgeMask = smoothstep(0.0, 0.09, vUv.x) * smoothstep(1.0, 0.91, vUv.x) *
                     smoothstep(0.0, 0.09, vUv.y) * smoothstep(1.0, 0.91, vUv.y);

    gl_FragColor = vec4(color, edgeMask * 0.88);
  }
`;

export function WarpedSurface() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHasWebGL(false);
      return;
    }

    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lighting for 3D transmission geometry
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
    keyLight.position.set(2, 4, 3);
    scene.add(keyLight);

    const crimsonRim = new THREE.PointLight(0xa11212, 6.0, 10);
    crimsonRim.position.set(-3, -2, 2);
    scene.add(crimsonRim);

    const cyanRim = new THREE.PointLight(0x00f0ff, 4.0, 8);
    cyanRim.position.set(3, 2, -1);
    scene.add(cyanRim);

    // Inward-curved background sheet mesh
    const planeGeo = new THREE.PlaneGeometry(5.2, 3.4, 64, 64);
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0.0 },
    };
    const planeMat = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const sheetMesh = new THREE.Mesh(planeGeo, planeMat);
    sheetMesh.position.set(0, 0, -0.6);
    scene.add(sheetMesh);

    // 3D Glass Star Mesh from star.glb (Authentic Ritzenthaler Reference Feature)
    let starMesh: THREE.Object3D | null = null;
    const loader = new GLTFLoader();
    loader.load(
      '/assets/3d/star.glb',
      (gltf) => {
        const star = gltf.scene;
        // Physical refractive glass material
        const glassMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          roughness: 0.05,
          transmission: 0.96,
          thickness: 2.2,
          ior: 1.54,
          transparent: true,
          opacity: 0.94,
          reflectivity: 0.9,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          specularColor: new THREE.Color(0xa11212),
          attenuationColor: new THREE.Color(0xffffff),
          attenuationDistance: 1.2,
        });

        star.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = glassMaterial;
          }
        });

        star.scale.set(0.72, 0.72, 0.72);
        star.rotation.x = Math.PI / 2;
        star.position.set(0, 0, 0.4);
        starMesh = star;
        scene.add(star);
      },
      undefined,
      (err) => {
        console.warn('Fallback: Star GLB not available, sheet continues active', err);
      }
    );

    // Pointer & Scroll state
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    let targetHover = 0.0;
    let pointerX = 0;
    let pointerY = 0;
    let smoothPX = 0;
    let smoothPY = 0;
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const onMouseBus = (coords: { x: number; y: number }) => {
      pointerX = coords.x * 2 - 1;
      pointerY = -(coords.y * 2 - 1);
    };
    MouseBus.on(onMouseBus);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMouse.set(x, y);
      targetHover = 1.0;
    };

    const handlePointerLeave = () => {
      targetHover = 0.0;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    const renderLoop = () => {
      const elapsedTime = clock.getElapsedTime();
      uniforms.uTime.value = elapsedTime;
      uniforms.uMouse.value.lerp(targetMouse, 0.08);
      uniforms.uHover.value = THREE.MathUtils.lerp(uniforms.uHover.value, targetHover, 0.05);

      // Subtle undulation on background sheet
      sheetMesh.rotation.y = -0.08 + Math.sin(elapsedTime * 0.35) * 0.03;
      sheetMesh.rotation.x = 0.12 + Math.cos(elapsedTime * 0.3) * 0.02;

      // Dynamic scroll-driven and pointer-driven rotation for the 3D Glass Star
      if (starMesh) {
        smoothPX += (pointerX - smoothPX) * 0.12;
        smoothPY += (pointerY - smoothPY) * 0.12;

        const rect = container.getBoundingClientRect();
        const scrollProgress = (rect.top - window.innerHeight / 2) / window.innerHeight;
        const scrollRotation = scrollProgress * Math.PI * 1.2;

        starMesh.rotation.x = Math.PI / 2 + smoothPY * 0.5 + Math.sin(elapsedTime * 0.5) * 0.08;
        starMesh.rotation.y = scrollRotation + smoothPX * 0.6;
        starMesh.rotation.z = smoothPX * 0.4 + elapsedTime * 0.15;

        starMesh.position.x = smoothPX * 0.45;
        starMesh.position.y = smoothPY * 0.35;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      MouseBus.off(onMouseBus);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      planeGeo.dispose();
      planeMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="warped-section-wrapper" aria-label="Dimensional computational surface">
      {/* Background Ghosted Typography that refracts through the glass star */}
      <div className="warped-ghost-text" aria-hidden="true">
        <span className="ghost-line ghost-left">DIMENSIONS</span>
        <span className="ghost-line ghost-right">OF COMPUTATION</span>
        <div className="ghost-sub">010101 · EMBEDDED TELEMETRY → HARDWARE PROTOCOLS → INTELLIGENT AI · 2026</div>
      </div>

      {/* Interactive WebGL Canvas Container */}
      <div className="warped-canvas-container" ref={mountRef}>
        {!hasWebGL && (
          <div className="warped-fallback" aria-hidden="true">
            <div className="fallback-mesh" />
            <div className="fallback-overlay" />
          </div>
        )}
      </div>

      {/* Foreground Technical Badges */}
      <div className="warped-telemetry">
        <div className="telemetry-item">
          <span className="telemetry-dot" />
          <span className="telemetry-label">3D ARTIFACT:</span>
          <span className="telemetry-val">REFRACTIVE TRANSMISSION STAR</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-label">TOPOLOGY:</span>
          <span className="telemetry-val">INWARD-CURVED 64×64 DISPLACEMENT</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-label">SPECTRUM:</span>
          <span className="telemetry-val">#A11212 CHROMATIC FRESNEL</span>
        </div>
      </div>
    </div>
  );
}
