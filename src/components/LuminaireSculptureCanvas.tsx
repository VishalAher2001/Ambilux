import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface LuminaireSculptureCanvasProps {
  currentPath: string;
}

function getRoutePreset(path: string): {
  x: number;
  y: number;
  scale: number;
  yaw: number;
  pitch: number;
} {
  if (path === '/') return { x: 0.41, y: 0.06, scale: 0.94, yaw: 0.28, pitch: 0.2 };
  if (path.startsWith('/about')) return { x: 0.44, y: 0.14, scale: 0.72, yaw: 0.9, pitch: 0.24 };
  if (path.startsWith('/services')) return { x: 0.42, y: 0.08, scale: 0.82, yaw: 1.5, pitch: 0.18 };
  if (path.startsWith('/products')) return { x: -0.45, y: 0.18, scale: 0.66, yaw: 2.15, pitch: 0.2 };
  if (path.startsWith('/projects')) return { x: 0.44, y: -0.16, scale: 0.68, yaw: 2.9, pitch: 0.14 };
  if (path.startsWith('/clients')) return { x: 0.45, y: 0.16, scale: 0.68, yaw: 3.6, pitch: 0.22 };
  if (path.startsWith('/contact')) return { x: 0.41, y: 0.08, scale: 0.78, yaw: 4.3, pitch: 0.18 };
  return { x: 0.41, y: 0.06, scale: 0.88, yaw: 0.28, pitch: 0.2 };
}

export default function LuminaireSculptureCanvas({ currentPath }: LuminaireSculptureCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const targetPresetRef = useRef(getRoutePreset(currentPath));

  useEffect(() => {
    targetPresetRef.current = getRoutePreset(currentPath);
  }, [currentPath]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isSoftwareGl = (() => {
      try {
        const probe = document.createElement('canvas').getContext('webgl2');
        if (!probe) return true;
        const ext = probe.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probe.RENDERER;
        const gpu = String(probe.getParameter(param));
        probe.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envRT = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(32, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 9.6);

    const hemiLight = new THREE.HemisphereLight(0xf7f6f2, 0x2a2a28, 1.3);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff3db, 2.6);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf5a623, 1.6);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    // Primary Architectural Luminaire Sculpture Hierarchy
    const flightGroup = new THREE.Group();
    const luminaireRoot = new THREE.Group();
    flightGroup.add(luminaireRoot);
    scene.add(flightGroup);

    const outerHalo = new THREE.Group();
    const opticalYoke = new THREE.Group();
    const fixtureCore = new THREE.Group();
    luminaireRoot.add(outerHalo, opticalYoke, fixtureCore);

    const disposables: { dispose: () => void }[] = [envRT];

    // Architectural materials matching AmbiLux charcoal, warm white, brushed brass & optical glass
    const anodizedCharcoalMat = new THREE.MeshStandardMaterial({
      color: 0x262624,
      metalness: 0.78,
      roughness: 0.34,
      envMapIntensity: 0.95,
    });
    const machinedAluminumMat = new THREE.MeshStandardMaterial({
      color: 0xd9d8d2,
      metalness: 0.9,
      roughness: 0.2,
      envMapIntensity: 1.05,
    });
    const warmBrassMat = new THREE.MeshStandardMaterial({
      color: 0xe6a832,
      metalness: 0.88,
      roughness: 0.22,
      envMapIntensity: 1.1,
    });
    const emissiveFilamentMat = new THREE.MeshStandardMaterial({
      color: 0xf7e1a8,
      emissive: 0xf5a623,
      emissiveIntensity: 1.4,
      roughness: 0.2,
      metalness: 0.1,
    });
    const opticalGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xf7f6f2,
      metalness: 0.04,
      roughness: 0.06,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      ior: 1.56,
      transmission: isSoftwareGl ? 0 : 0.74,
      transparent: true,
      opacity: isSoftwareGl ? 0.58 : 0.94,
      thickness: 1.2,
      envMapIntensity: 1.25,
    });

    disposables.push(
      anodizedCharcoalMat,
      machinedAluminumMat,
      warmBrassMat,
      emissiveFilamentMat,
      opticalGlassMat
    );

    // Part 1: Architectural Dome Shade (LatheGeometry spun luminaire profile)
    const domePoints = [
      new THREE.Vector2(0.0, 0.72),
      new THREE.Vector2(0.16, 0.72),
      new THREE.Vector2(0.24, 0.58),
      new THREE.Vector2(0.58, 0.42),
      new THREE.Vector2(0.92, 0.14),
      new THREE.Vector2(0.98, 0.0),
      new THREE.Vector2(0.91, 0.0),
      new THREE.Vector2(0.54, 0.36),
      new THREE.Vector2(0.18, 0.52),
      new THREE.Vector2(0.0, 0.54),
    ];
    const domeGeo = new THREE.LatheGeometry(domePoints, 48);
    const domeMesh = new THREE.Mesh(domeGeo, anodizedCharcoalMat);
    fixtureCore.add(domeMesh);
    disposables.push(domeGeo);

    // Part 2: Warm Brass Internal Reflector Baffle
    const baffleGeo = new THREE.CylinderGeometry(0.18, 0.54, 0.34, 36, 1, true);
    const baffleMesh = new THREE.Mesh(baffleGeo, warmBrassMat);
    baffleMesh.material.side = THREE.DoubleSide;
    baffleMesh.position.y = 0.24;
    fixtureCore.add(baffleMesh);
    disposables.push(baffleGeo);

    // Part 3: Glowing Optical COB Emitter Lens
    const emitterGeo = new THREE.SphereGeometry(0.24, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    const emitterMesh = new THREE.Mesh(emitterGeo, emissiveFilamentMat);
    emitterMesh.position.y = 0.36;
    fixtureCore.add(emitterMesh);
    disposables.push(emitterGeo);

    // Part 4: Pendant Architectural Conduit Neck & Stem
    const stemGeo = new THREE.CylinderGeometry(0.032, 0.055, 0.68, 20);
    const stemMesh = new THREE.Mesh(stemGeo, machinedAluminumMat);
    stemMesh.position.y = 1.02;
    fixtureCore.add(stemMesh);
    disposables.push(stemGeo);

    // Part 5: Crown Optical Diffuser Lens Beneath Dome
    const diffuserGeo = new THREE.SphereGeometry(0.68, 36, 20, 0, Math.PI * 2, 0, Math.PI * 0.42);
    diffuserGeo.rotateX(Math.PI);
    const diffuserMesh = new THREE.Mesh(diffuserGeo, opticalGlassMat);
    diffuserMesh.position.y = 0.14;
    fixtureCore.add(diffuserMesh);
    disposables.push(diffuserGeo);

    // Part 6: Outer Circular Geometrical Linear Halo Ring
    const haloGeo = new THREE.TorusGeometry(1.42, 0.028, 18, 96);
    const haloMesh = new THREE.Mesh(haloGeo, machinedAluminumMat);
    outerHalo.add(haloMesh);
    disposables.push(haloGeo);

    // Part 7: Inner Luminous Yellow-Warm Strip Inside Torus
    const innerGlowRingGeo = new THREE.TorusGeometry(1.38, 0.014, 14, 96);
    const innerGlowRing = new THREE.Mesh(innerGlowRingGeo, emissiveFilamentMat);
    outerHalo.add(innerGlowRing);
    disposables.push(innerGlowRingGeo);

    // Part 8: Precision Calibrated Yoke Frame
    const yokeGeo = new THREE.TorusGeometry(1.12, 0.022, 16, 80, Math.PI * 1.35);
    const yokeMesh = new THREE.Mesh(yokeGeo, anodizedCharcoalMat);
    yokeMesh.rotation.z = -0.5;
    opticalYoke.add(yokeMesh);
    disposables.push(yokeGeo);

    // Part 9: Four Signature AmbiLux Spectrum Nodes around Upper Aperture (Red, Yellow, Blue, Green)
    const nodeGeo = new THREE.BoxGeometry(0.09, 0.055, 0.055);
    disposables.push(nodeGeo);
    const spectrumColors = [0xe52b38, 0xf5a623, 0x1685c7, 0x159447];
    spectrumColors.forEach((hex, idx) => {
      const nodeMat = new THREE.MeshStandardMaterial({
        color: hex,
        metalness: 0.45,
        roughness: 0.25,
        emissive: hex,
        emissiveIntensity: 0.22,
      });
      disposables.push(nodeMat);
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = Math.PI * 0.26 + idx * 0.34;
      node.position.set(Math.cos(angle) * 1.42, Math.sin(angle) * 1.42, 0);
      node.rotation.z = angle + Math.PI / 2;
      outerHalo.add(node);
    });

    // Floating Architectural Glass & Brass Prism Shards
    const shardGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.56, 6);
    disposables.push(shardGeo);

    const satellites: {
      mesh: THREE.Mesh;
      basePos: [number, number, number];
      speed: number;
      phase: number;
      parallax: number;
    }[] = [
      { mesh: new THREE.Mesh(shardGeo, opticalGlassMat), basePos: [-3.3, 1.55, -1.7], speed: 0.7, phase: 0.4, parallax: 0.45 },
      { mesh: new THREE.Mesh(shardGeo, machinedAluminumMat), basePos: [3.2, -1.4, -1.3], speed: 0.85, phase: 1.9, parallax: -0.35 },
      { mesh: new THREE.Mesh(shardGeo, warmBrassMat), basePos: [-2.5, -1.55, -2.0], speed: 0.65, phase: 3.1, parallax: 0.5 },
      { mesh: new THREE.Mesh(shardGeo, opticalGlassMat), basePos: [1.7, 1.9, -1.8], speed: 0.8, phase: 4.8, parallax: -0.4 },
    ];

    satellites.forEach((sat) => {
      sat.mesh.position.set(...sat.basePos);
      scene.add(sat.mesh);
    });

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
    const smoothed = { x: 0.41, y: 0.06, scale: 0.94, yaw: 0.28, pitch: 0.2, scroll: 0 };
    const clock = new THREE.Clock();

    const onPointerMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      pointer.x = (e.clientX / w) * 2 - 1;
      pointer.y = -((e.clientY / h) * 2 - 1);
    };

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize);

    let frameId = 0;
    let disposed = false;

    const afterDraw = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    };

    const FOV_TAN = Math.tan(THREE.MathUtils.degToRad(32) / 2);

    const tick = () => {
      if (disposed) return;
      const dt = Math.min(clock.getDelta(), 0.05) || 0.016;
      const t = clock.elapsedTime;

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollNorm = THREE.MathUtils.clamp(window.scrollY / maxScroll, 0, 1);

      const preset = targetPresetRef.current;
      const isNarrow = window.innerWidth < 900;

      const scrollArc = Math.sin(scrollNorm * Math.PI);
      const diveY = prefersReducedMotion ? 0 : scrollArc * -0.18;
      const sweepX = prefersReducedMotion ? 0 : Math.sin(scrollNorm * Math.PI * 1.4) * -0.2;

      const targetScale =
        (isNarrow ? preset.scale * 0.54 : preset.scale) * (1 + scrollArc * 0.08 - scrollNorm * 0.14);
      const targetX = isNarrow ? preset.x * 0.42 : preset.x + sweepX;
      const targetY = preset.y + diveY - scrollNorm * 0.1;

      const prevX = smoothed.x;
      const prevY = smoothed.y;

      smoothed.x = THREE.MathUtils.damp(smoothed.x, targetX, 3.2, dt);
      smoothed.y = THREE.MathUtils.damp(smoothed.y, targetY, 3.2, dt);
      smoothed.scale = THREE.MathUtils.damp(smoothed.scale, targetScale, 3.4, dt);
      smoothed.yaw = THREE.MathUtils.damp(smoothed.yaw, preset.yaw + scrollNorm * 2.4, 2.8, dt);
      smoothed.pitch = THREE.MathUtils.damp(smoothed.pitch, preset.pitch, 3.0, dt);
      smoothed.scroll = THREE.MathUtils.damp(smoothed.scroll, scrollNorm, 4.0, dt);

      const vx = (smoothed.x - prevX) / dt;
      const vy = (smoothed.y - prevY) / dt;

      pointer.sx = THREE.MathUtils.damp(pointer.sx, pointer.x, 3.2, dt);
      pointer.sy = THREE.MathUtils.damp(pointer.sy, pointer.y, 3.2, dt);

      const halfH = FOV_TAN * camera.position.z;
      const halfW = halfH * camera.aspect;
      const motionFactor = prefersReducedMotion ? 0.08 : 1;

      const floatX = prefersReducedMotion ? 0 : Math.sin(t * 0.85) * 0.055;
      const floatY = prefersReducedMotion
        ? 0
        : Math.sin(t * 1.35) * 0.08 + Math.sin(t * 2.5) * 0.02;
      const floatZ = prefersReducedMotion ? 0 : Math.sin(t * 0.7) * 0.2;

      flightGroup.position.set(
        smoothed.x * halfW + floatX + pointer.sx * 0.16,
        smoothed.y * halfH + floatY + pointer.sy * 0.13,
        floatZ
      );
      flightGroup.scale.setScalar(halfH * 2 * 0.17 * smoothed.scale);

      const bankRoll = THREE.MathUtils.clamp(vx * 0.36, -0.42, 0.42) * motionFactor;
      const divePitch = THREE.MathUtils.clamp(-vy * 0.34, -0.38, 0.38) * motionFactor;

      luminaireRoot.rotation.set(
        smoothed.pitch + divePitch + pointer.sy * 0.2,
        smoothed.yaw + t * 0.16 * motionFactor + pointer.sx * 0.28,
        -0.12 + bankRoll,
        'YZX'
      );

      outerHalo.rotation.x = t * 0.24 * motionFactor + smoothed.scroll * 2.1;
      outerHalo.rotation.y = t * 0.18 * motionFactor;
      opticalYoke.rotation.y = -t * 0.3 * motionFactor + smoothed.scroll * 1.9;
      fixtureCore.rotation.y = t * 0.35 * motionFactor;

      for (let i = 0; i < satellites.length; i++) {
        const sat = satellites[i];
        sat.mesh.position.x =
          sat.basePos[0] +
          Math.cos(t * sat.speed * 0.6 + sat.phase) * 0.16 * motionFactor +
          pointer.sx * 0.14;
        sat.mesh.position.y =
          sat.basePos[1] +
          Math.sin(t * sat.speed + sat.phase) * 0.2 * motionFactor +
          smoothed.scroll * sat.parallax * 2.0 +
          pointer.sy * 0.11;
        sat.mesh.rotation.x = t * 0.35 * sat.speed * motionFactor + smoothed.scroll * 1.5;
        sat.mesh.rotation.z = t * 0.45 * sat.speed * motionFactor;
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden opacity-85 transition-opacity duration-700"
    />
  );
}
