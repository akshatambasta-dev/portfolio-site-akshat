import { useEffect, useRef } from 'react';

/**
 * Interactive WebGL Fluid & Liquid Wake Effect
 * Inspired by Ryan Ritzenthaler's mouse-reactive liquid simulation.
 * Paints viscous liquid ripples as the pointer moves across the page.
 */
export function FluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(pointer: fine)').matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Quad geometry
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const vsSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec2 uVelocity;

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        float aspect = uResolution.x / uResolution.y;
        vec2 p = uv;
        p.x *= aspect;
        vec2 m = uMouse;
        m.x *= aspect;

        float dist = distance(p, m);
        float vel = length(uVelocity);

        // Fluid wake ripple
        float ripple = sin(dist * 28.0 - uTime * 4.0) * exp(-dist * 4.2);
        float wake = smoothstep(0.35, 0.0, dist) * min(vel * 2.5, 1.2);

        // Subtle fluid chromatic dispersion
        vec3 deepRed = vec3(0.63, 0.07, 0.07); // #A11212
        vec3 cyanTint = vec3(0.0, 0.94, 1.0);

        vec3 color = mix(cyanTint, deepRed, smoothstep(-0.2, 0.3, ripple));
        float alpha = (abs(ripple) * 0.4 + wake * 0.6) * 0.12;

        gl_FragColor = vec4(color, alpha);
      }
    `;

    const createShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const aPosLoc = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uResLoc = gl.getUniformLocation(program, 'uResolution');
    const uMouseLoc = gl.getUniformLocation(program, 'uMouse');
    const uVelLoc = gl.getUniformLocation(program, 'uVelocity');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;
    let velX = 0;
    let velY = 0;
    let rafId: number;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX / window.innerWidth;
      targetY = 1.0 - e.clientY / window.innerHeight;
    };

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      gl.viewport(0, 0, width, height);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize);
    onResize();

    const render = (now: number) => {
      const dx = targetX - mouseX;
      const dy = targetY - mouseY;

      mouseX += dx * 0.12;
      mouseY += dy * 0.12;

      velX = velX * 0.9 + dx * 0.1;
      velY = velY * 0.9 + dy * 0.1;

      gl.uniform1f(uTimeLoc, now * 0.001);
      gl.uniform2f(uResLoc, width, height);
      gl.uniform2f(uMouseLoc, mouseX, mouseY);
      gl.uniform2f(uVelLoc, velX, velY);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
      gl.deleteBuffer(quadBuffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fluid-wake-canvas"
      aria-hidden="true"
    />
  );
}
