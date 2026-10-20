import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

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

    // Curved inward-bending pillow/dish geometry
    float distFromCenter = distance(uv, vec2(0.5));
    float curvature = sin(uv.x * 3.14159) * sin(uv.y * 3.14159);
    pos.z -= (1.0 - curvature) * 0.45;

    // Fluid undulating displacement waves
    float wave1 = sin(pos.x * 3.0 + uTime * 1.2) * cos(pos.y * 3.0 + uTime * 0.9) * 0.12;
    float wave2 = sin(pos.x * 6.0 - uTime * 1.5 + pos.y * 4.0) * 0.05;

    // Cursor interaction ripple
    float mouseDist = distance(uv, uMouse);
    float mouseRipple = sin(mouseDist * 18.0 - uTime * 4.0) * exp(-mouseDist * 3.5) * 0.18 * uHover;

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
    // Subtle iridescence and Fresnel rim
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.5);

    // Deep architectural monochrome base
    vec3 baseDark = vec3(0.04, 0.04, 0.045);
    vec3 baseLight = vec3(0.18, 0.18, 0.20);
    vec3 surface = mix(baseDark, baseLight, vElevation * 2.0 + 0.5);

    // Controlled chromatic dispersion: deep red and subtle cyan rim
    vec3 deepRed = vec3(0.63, 0.07, 0.07); // #A11212
    vec3 cyanGlow = vec3(0.12, 0.75, 0.85);

    vec3 color = surface;
    color += fresnel * deepRed * 1.8;
    color += pow(fresnel, 4.0) * cyanGlow * 0.9;

    // Delicate procedural coordinate grid
    vec2 gridUv = fract(vUv * 28.0);
    float gridLine = step(0.96, gridUv.x) + step(0.96, gridUv.y);
    color += gridLine * vec3(0.08);

    // Subtle edge fade for soft inward-bending integration
    float edgeMask = smoothstep(0.0, 0.08, vUv.x) * smoothstep(1.0, 0.92, vUv.x) *
                     smoothstep(0.0, 0.08, vUv.y) * smoothstep(1.0, 0.92, vUv.y);

    gl_FragColor = vec4(color, edgeMask * 0.95);
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

    // Check WebGL support
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

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 2.4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Warped dimensional plane geometry
    const geometry = new THREE.PlaneGeometry(2.3, 1.5, 64, 64);
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = 0.22;
    mesh.rotation.y = -0.15;
    scene.add(mesh);

    let animationFrameId: number;
    let targetMouse = new THREE.Vector2(0.5, 0.5);
    let targetHover = 0;
    const clock = new THREE.Clock();

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMouse.set(x, y);
      targetHover = 1.0;
    };

    const handlePointerLeave = () => {
      targetHover = 0;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    const renderLoop = () => {
      const elapsedTime = clock.getElapsedTime();
      uniforms.uTime.value = elapsedTime;

      // Smooth interpolation for mouse position and hover weight
      uniforms.uMouse.value.lerp(targetMouse, 0.08);
      uniforms.uHover.value = THREE.MathUtils.lerp(uniforms.uHover.value, targetHover, 0.05);

      // Subtle resting rotation
      mesh.rotation.y = -0.15 + Math.sin(elapsedTime * 0.4) * 0.04;
      mesh.rotation.x = 0.22 + Math.cos(elapsedTime * 0.35) * 0.03;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="warped-section-wrapper" aria-label="Dimensional computational surface">
      {/* Background Ghosted Typography */}
      <div className="warped-ghost-text" aria-hidden="true">
        <span className="ghost-line ghost-left">DIMENSIONS</span>
        <span className="ghost-line ghost-right">OF COMPUTATION</span>
        <div className="ghost-sub">010101 · AC TELEMETRY → EMBEDDED LOGIC → MACHINE INTELLIGENCE · 2026</div>
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
          <span className="telemetry-label">SURFACE:</span>
          <span className="telemetry-val">GLSL VERTEX DISPLACEMENT</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-label">TOPOLOGY:</span>
          <span className="telemetry-val">INWARD-CURVED 64×64 GRID</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-label">SPECTRUM:</span>
          <span className="telemetry-val">#A11212 CHROMATIC FRESNEL</span>
        </div>
      </div>
    </div>
  );
}
