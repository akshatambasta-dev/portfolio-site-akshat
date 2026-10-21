import { useEffect, useRef } from 'react';

type MouseListener = (coords: { x: number; y: number; clientX: number; clientY: number }) => void;

class MouseEventBus {
  private listeners: Set<MouseListener> = new Set();
  public current = { x: 0.5, y: 0.5, clientX: 0, clientY: 0 };

  on(fn: MouseListener) {
    this.listeners.add(fn);
  }

  off(fn: MouseListener) {
    this.listeners.delete(fn);
  }

  emit(coords: { x: number; y: number; clientX: number; clientY: number }) {
    this.current = coords;
    this.listeners.forEach((fn) => fn(coords));
  }
}

export const MouseBus = new MouseEventBus();

interface MagnetState {
  el: HTMLElement;
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
  isActive: boolean;
}

export function Cursor() {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only run on non-touch devices with fine pointers and motion enabled
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(pointer: fine)').matches
    ) {
      return;
    }

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isVisible = false;
    let rafId: number;

    const magnetMap = new Map<HTMLElement, MagnetState>();
    let activeMagnet: HTMLElement | null = null;
    let magnetTargetX = 0;
    let magnetTargetY = 0;

    const registerMagnets = () => {
      const magnetEls = Array.from(document.querySelectorAll<HTMLElement>('.magnet'));
      magnetEls.forEach((el) => {
        if (!magnetMap.has(el)) {
          magnetMap.set(el, {
            el,
            targetX: 0,
            targetY: 0,
            currentX: 0,
            currentY: 0,
            isActive: false,
          });

          el.addEventListener('mouseenter', () => {
            activeMagnet = el;
            isHovering = true;
            ring.classList.add('is-hovering', 'is-magnetic');
          });

          el.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            magnetTargetX = relX * 0.32;
            magnetTargetY = relY * 0.32;
            const state = magnetMap.get(el);
            if (state) {
              state.targetX = magnetTargetX;
              state.targetY = magnetTargetY;
              state.isActive = true;
            }
          });

          el.addEventListener('mouseleave', () => {
            if (activeMagnet === el) {
              activeMagnet = null;
              isHovering = false;
              ring.classList.remove('is-hovering', 'is-magnetic');
            }
            const state = magnetMap.get(el);
            if (state) {
              state.targetX = 0;
              state.targetY = 0;
            }
          });
        }
      });
    };

    registerMagnets();
    // Re-scan magnets when DOM changes (e.g. tab switches)
    const observer = new MutationObserver(registerMagnets);
    observer.observe(document.body, { childList: true, subtree: true });

    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      MouseBus.emit({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
        clientX: e.clientX,
        clientY: e.clientY,
      });

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      if (!activeMagnet) {
        const target = e.target as HTMLElement | null;
        if (target) {
          const interactive = target.closest('a, button, [role="button"], input, select, .interactive-item');
          isHovering = !!interactive;
        }
      }
    };

    const onPointerLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);

    const updateLoop = () => {
      // Direct positioning for dot
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // Smooth damped spring for ring
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      const scale = isHovering ? 1.6 : 1.0;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;

      if (isHovering) {
        ring.classList.add('is-hovering');
      } else {
        ring.classList.remove('is-hovering');
      }

      // Animate active magnets
      magnetMap.forEach((state) => {
        state.currentX += (state.targetX - state.currentX) * 0.22;
        state.currentY += (state.targetY - state.currentY) * 0.22;

        if (Math.abs(state.currentX) > 0.02 || Math.abs(state.currentY) > 0.02) {
          state.el.style.transform = `translate3d(${state.currentX.toFixed(2)}px, ${state.currentY.toFixed(2)}px, 0)`;
        } else if (state.isActive && state.targetX === 0 && state.targetY === 0) {
          state.el.style.transform = '';
          state.isActive = false;
        }
      });

      rafId = requestAnimationFrame(updateLoop);
    };

    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="custom-cursor-root" aria-hidden="true">
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" />
    </div>
  );
}
