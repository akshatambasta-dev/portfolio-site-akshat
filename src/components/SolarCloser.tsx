import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const SOLAR_VERTEX_SHADER = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SOLAR_FRAGMENT_SHADER = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  // Simplex 3D noise approximation
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    float rim = 1.0 - max(dot(vNormal, viewDir), 0.0);

    // Multi-octave turbulent plasma noise
    vec3 coord = vPosition * 1.8 + vec3(0.0, 0.0, uTime * 0.22);
    float n1 = snoise(coord);
    float n2 = snoise(coord * 2.2 + vec3(uTime * 0.15, -uTime * 0.2, 0.0));
    float plasma = n1 * 0.65 + n2 * 0.35;

    // Solar palette: Core white-hot yellow to deep builder red (#A11212) to corona orange
    vec3 whiteHot = vec3(1.0, 0.96, 0.82);
    vec3 solarGold = vec3(1.0, 0.62, 0.15);
    vec3 solarRed = vec3(0.63, 0.07, 0.07); // #A11212
    vec3 deepDark = vec3(0.08, 0.01, 0.02);

    vec3 color = mix(solarRed, solarGold, plasma + 0.3);
    color = mix(color, whiteHot, pow(max(plasma, 0.0), 3.0) * 1.2);
    color = mix(deepDark, color, pow(max(1.0 - rim, 0.0), 0.6));

    // Outer incandescent corona flare
    float corona = pow(rim, 3.2) * 2.4;
    color += solarGold * corona + solarRed * pow(rim, 1.8) * 1.6;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function SolarCloser() {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = canvasRef.current;
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

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Solar sphere geometry
    const geometry = new THREE.SphereGeometry(1.08, 64, 64);
    const uniforms = {
      uTime: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: SOLAR_VERTEX_SHADER,
      fragmentShader: SOLAR_FRAGMENT_SHADER,
      uniforms,
    });

    const sunMesh = new THREE.Mesh(geometry, material);
    scene.add(sunMesh);

    // Subtle starfield layer in 3D
    const starCount = 180;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 12;
      starPositions[i + 1] = (Math.random() - 0.5) * 8;
      starPositions[i + 2] = -2 - Math.random() * 5;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.025,
      transparent: true,
      opacity: 0.7,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    let animationFrameId: number;
    const clock = new THREE.Clock();

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
      const elapsed = clock.getElapsedTime();
      uniforms.uTime.value = elapsed;

      sunMesh.rotation.y = elapsed * 0.08;
      sunMesh.rotation.x = Math.sin(elapsed * 0.05) * 0.06;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="solar-closer-section" aria-label="Closing statement and visual climax">
      <div className="solar-starfield" aria-hidden="true" />
      <div className="solar-ambient-glow" aria-hidden="true" />

      {/* 3D WebGL Solar Canvas */}
      <div className="solar-canvas-wrapper" ref={canvasRef} aria-hidden="true">
        {!hasWebGL && (
          <div className="solar-fallback">
            <div className="solar-fallback-sun" />
          </div>
        )}
      </div>

      {/* Foreground Content */}
      <div className="container solar-content">
        <div className="solar-kicker">
          <span className="solar-star-icon">✦</span>
          <span>THE NEXT SYSTEM BEGINS HERE</span>
        </div>

        <h2 className="solar-heading">
          <span className="solar-heading-blackletter">LET’S BUILD</span>
          <span className="solar-heading-dot">.</span>
        </h2>

        <p className="solar-subtext">
          Whether it’s architecting embedded hardware telemetry, engineering web APIs, or turning unstructured data into clean systems — let’s create something tangible together.
        </p>

        <div className="solar-cta-group">
          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=Project%20Collaboration`}
            className="solar-primary-btn"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a href="#contact" className="solar-secondary-btn">
            <span>View All Channels</span>
            <span className="btn-down-arrow">↓</span>
          </a>
        </div>

        <div className="solar-metadata">
          <span>AKSHAT AMBASTA · 2026 EDITION</span>
          <span>BASED IN PUNE, INDIA · AVAILABLE NATIONWIDE</span>
        </div>
      </div>
    </section>
  );
}
