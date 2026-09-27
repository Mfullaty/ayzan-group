'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { SceneControls } from '@/lib/create-scene';

export function HeroScene() {
  const host = useRef<HTMLDivElement>(null);
  const controls = useRef<SceneControls | null>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    let disposed = false;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPaused(motion.matches);
    import('@/lib/create-scene').then(({ createScene }) => {
      if (disposed || !host.current) return;
      try {
        controls.current = createScene(host.current, motion.matches, () => setReady(false));
        setReady(true);
      } catch { setReady(false); }
    }).catch(() => setReady(false));
    const onMotion = () => { setPaused(motion.matches); controls.current?.setPaused(motion.matches); };
    motion.addEventListener('change', onMotion);
    return () => { disposed = true; controls.current?.dispose(); controls.current = null; motion.removeEventListener('change', onMotion); };
  }, []);
  const toggle = () => { const value = !paused; setPaused(value); controls.current?.setPaused(value); };
  return <div className={`scene ${ready ? 'is-ready' : ''}`}>
    <Image className="scene-fallback" src="/assets/connected-sculpture.webp" fill sizes="(max-width: 800px) 95vw, 50vw" alt="Interconnected pink and silver loops symbolizing the five Ayzan businesses" priority/>
    <div className="scene-host" ref={host} aria-hidden="true"/>
    {ready && <div className="scene-controls"><span>EXPLORE IN 3D</span><button onClick={() => controls.current?.rotate(-0.3)} aria-label="Rotate sculpture left">←</button><button onClick={toggle} aria-label={paused ? 'Play sculpture animation' : 'Pause sculpture animation'} aria-pressed={paused}>{paused ? '▶' : 'Ⅱ'}</button><button onClick={() => controls.current?.rotate(0.3)} aria-label="Rotate sculpture right">→</button></div>}
  </div>;
}
