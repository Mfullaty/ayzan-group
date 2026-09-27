import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
export type SceneControls = { setPaused(value: boolean): void; rotate(value: number): void; dispose(): void };
export function createScene(host: HTMLElement, initiallyPaused: boolean, onLoss: () => void): SceneControls {
  const parent = host.parentElement!;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x101012, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
  camera.position.set(0, 0.2, 8.6);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose(); pmrem.dispose();
  const group = new THREE.Group();
  const sculpture = new THREE.Group();
  group.add(sculpture); scene.add(group);
  const pink = new THREE.MeshPhysicalMaterial({ color: 0xff2797, metalness: .73, roughness: .16, clearcoat: 1, clearcoatRoughness: .08 });
  const silver = new THREE.MeshPhysicalMaterial({ color: 0xdde0e7, metalness: 1, roughness: .17, clearcoat: 1 });
  const ring = new THREE.TorusGeometry(.88, .235, 28, 96);
  for (let i = 0; i < 5; i++) {
    const angle = i * (Math.PI * 2 / 5);
    const mesh = new THREE.Mesh(ring, i % 2 ? silver : pink);
    mesh.position.set(Math.sin(angle) * .99, Math.cos(angle) * .99, Math.sin(angle * 2) * .2);
    mesh.rotation.set(.43 * Math.cos(angle), .62 * Math.sin(angle), -angle + .2);
    mesh.scale.set(.77, 1.05, 1);
    sculpture.add(mesh);
  }
  const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(.32, 3), silver);
  inner.position.z = .45; sculpture.add(inner);
  sculpture.rotation.set(-.17, -.33, -.12);
  const key = new THREE.DirectionalLight(0xffffff, 4); key.position.set(-3, 5, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0xff419f, 5); rim.position.set(4, -1, 3); scene.add(rim);
  const ambient = new THREE.AmbientLight(0xffffff, .45); scene.add(ambient);
  let paused = initiallyPaused, visible = true, destroyed = false, rotation = 0, frame = 0, previous = 0, elapsed = 0;
  const pointer = { x: 0, y: 0 };
  function render(time: number) {
    frame = 0;
    if (destroyed || !visible || document.hidden) return;
    const dt = previous ? Math.min((time - previous) / 1000, .05) : 0;
    previous = time;
    if (!paused) { elapsed += dt; group.rotation.y += (pointer.x * .26 + rotation + Math.sin(elapsed * .22) * .3 - group.rotation.y) * .035; group.rotation.x += (pointer.y * .18 - group.rotation.x) * .035; group.position.y = Math.sin(elapsed * .8) * .085; group.rotation.z = Math.sin(elapsed * .27) * .035; }
    renderer.render(scene, camera);
    if (!paused) frame = requestAnimationFrame(render);
  }
  function requestRender() { if (!frame && !destroyed && visible && !document.hidden) frame = requestAnimationFrame(render); }
  const resize = new ResizeObserver(() => { const {width, height} = parent.getBoundingClientRect(); renderer.setSize(width, height, false); camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix(); requestRender(); });
  resize.observe(parent);
  const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; previous = 0; if (visible) requestRender(); else { cancelAnimationFrame(frame); frame = 0; } }, { rootMargin: '80px' });
  intersection.observe(parent);
  const move = (event: PointerEvent) => { const rect = parent.getBoundingClientRect(); pointer.x = (event.clientX - rect.left) / rect.width * 2 - 1; pointer.y = (event.clientY - rect.top) / rect.height * 2 - 1; };
  const leave = () => { pointer.x = 0; pointer.y = 0; };
  const visibility = () => { previous = 0; if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else requestRender(); };
  const lost = (event: Event) => { event.preventDefault(); cancelAnimationFrame(frame); frame = 0; onLoss(); };
  parent.addEventListener('pointermove', move, { passive: true }); parent.addEventListener('pointerleave', leave);
  document.addEventListener('visibilitychange', visibility); renderer.domElement.addEventListener('webglcontextlost', lost);
  requestRender();
  return {
    setPaused(value) { paused = value; previous = 0; requestRender(); },
    rotate(value) { rotation += value; group.rotation.y += value; requestRender(); },
    dispose() {
      destroyed = true; cancelAnimationFrame(frame); resize.disconnect(); intersection.disconnect();
      parent.removeEventListener('pointermove', move); parent.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', visibility); renderer.domElement.removeEventListener('webglcontextlost', lost);
      ring.dispose(); inner.geometry.dispose(); pink.dispose(); silver.dispose(); environment.dispose(); renderer.dispose(); renderer.domElement.remove();
    },
  };
}
