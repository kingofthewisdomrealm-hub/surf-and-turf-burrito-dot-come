import * as THREE from "three";
import { LAYERS, type LayerId } from "@/lib/recipes";

type Handle = {
  nudgeZoom: (dir: number) => void;
  dispose: () => void;
};

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(src));
    img.src = src;
  });
}

function keyCanvas(img: HTMLImageElement, threshold = 18, feather = 40) {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.drawImage(img, 0, 0);
  const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = frame.data;
  for (let i = 0; i < data.length; i += 4) {
    const lum = Math.max(data[i], data[i + 1], data[i + 2]);
    const alpha =
      lum <= threshold ? 0 : lum >= threshold + feather ? 1 : (lum - threshold) / feather;
    data[i + 3] = Math.round(alpha * 255);
  }
  ctx.putImageData(frame, 0, 0);
  return canvas;
}

function canvasTexture(canvas: HTMLCanvasElement) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

type Piece = {
  id: LayerId;
  mesh: THREE.Mesh;
  homeX: number;
  openX: number;
  y: number;
  w: number;
  h: number;
  flip: boolean;
  held: boolean;
  hx: number;
  hy: number;
};

export async function mountBurrito(canvas: HTMLCanvasElement): Promise<Handle> {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
  camera.position.set(0, 0.15, 8.6);

  scene.add(new THREE.AmbientLight(0xfff2e2, 0.62));
  const key = new THREE.DirectionalLight(0xffe2c0, 1.8);
  key.position.set(-3, 4, 5);
  scene.add(key);

  const root = new THREE.Group();
  root.rotation.y = -0.22;
  scene.add(root);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(5.2, 48),
    new THREE.MeshStandardMaterial({ color: 0x3a2418, roughness: 0.94, metalness: 0 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.85;
  root.add(floor);

  const images = await Promise.all(LAYERS.map((layer) => loadImage(layer.image)));
  const cutouts = images.map((img) => keyCanvas(img));

  const board = document.createElement("canvas");
  board.width = 1600;
  board.height = 860;
  const bctx = board.getContext("2d");
  if (!bctx) throw new Error("board");

  const placed: Record<string, { x: number; y: number; w: number; h: number }> = {
    tortilla: { x: 0, y: 20, w: 640, h: 820 },
    rice: { x: 430, y: 90, w: 400, h: 680 },
    fries: { x: 520, y: 70, w: 380, h: 700 },
    steak: { x: 610, y: 80, w: 400, h: 680 },
    shrimp: { x: 700, y: 40, w: 360, h: 740 },
    cheese: { x: 790, y: 60, w: 340, h: 720 },
    sauce: { x: 860, y: 50, w: 300, h: 760 },
    guacamole: { x: 930, y: 90, w: 380, h: 660 },
    pico: { x: 1020, y: 110, w: 340, h: 640 },
    wrap: { x: 960, y: 20, w: 640, h: 820 },
  };

  const layout = LAYERS.map((layer) => {
    const box = placed[layer.id];
    return { id: layer.id, ...box, flip: layer.id === "wrap" };
  });

  const drawOrder = ["tortilla", "wrap", "rice", "fries", "steak", "shrimp", "cheese", "sauce", "guacamole", "pico"];
  for (const id of drawOrder) {
    const index = LAYERS.findIndex((layer) => layer.id === id);
    const slot = layout[index];
    const src = cutouts[index];
    bctx.save();
    if (slot.flip) {
      bctx.translate(slot.x + slot.w, slot.y);
      bctx.scale(-1, 1);
      bctx.drawImage(src, 0, 0, slot.w, slot.h);
    } else {
      bctx.drawImage(src, slot.x, slot.y, slot.w, slot.h);
    }
    bctx.restore();
  }

  const heroW = 6.8;
  const heroH = heroW * (board.height / board.width);
  const heroMat = new THREE.MeshBasicMaterial({
    map: canvasTexture(board),
    transparent: true,
    depthWrite: false,
  });
  const hero = new THREE.Mesh(new THREE.PlaneGeometry(heroW, heroH), heroMat);
  hero.position.y = 0.05;
  root.add(hero);

  const pieces: Piece[] = layout.map((slot, index) => {
    const material = new THREE.MeshBasicMaterial({
      map: canvasTexture(cutouts[index]),
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      opacity: 0,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    mesh.userData.id = slot.id;
    const worldW = (slot.w / board.width) * heroW;
    const worldH = (slot.h / board.height) * heroH;
    const homeX = ((slot.x + slot.w / 2) / board.width - 0.5) * heroW;
    const homeY = (0.5 - (slot.y + slot.h / 2) / board.height) * heroH;
    mesh.scale.set(slot.flip ? -worldW : worldW, worldH, 1);
    mesh.position.set(homeX, homeY, 0.02);
    mesh.visible = false;
    root.add(mesh);
    const openX = (index - (layout.length - 1) / 2) * 0.64;
    return {
      id: slot.id,
      mesh,
      homeX,
      openX,
      y: homeY,
      w: worldW,
      h: worldH,
      flip: slot.flip,
      held: false,
      hx: homeX,
      hy: homeY,
    };
  });

  let spread = 0;
  let targetSpread = 0;
  let zoomBias = 0;
  let running = true;
  let pulling = false;
  let pullStartX = 0;
  let pullStartSpread = 0;
  let grab: Piece | null = null;
  let grabOffset = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const hitPoint = new THREE.Vector3();
  const plane = new THREE.Plane();
  const normal = new THREE.Vector3();

  function resize() {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);

  const projected = new THREE.Vector3();

  function pieceAt(ev: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(
      pieces.map((piece) => piece.mesh).filter((mesh) => mesh.visible),
      false,
    );
    const id = hits[0]?.object.userData.id as LayerId | undefined;
    const hit = pieces.find((piece) => piece.id === id);
    if (hit) return hit;
    const px = ev.clientX - rect.left;
    const py = ev.clientY - rect.top;
    let best: Piece | null = null;
    let bestD = 110;
    for (const piece of pieces) {
      if (!piece.mesh.visible) continue;
      piece.mesh.getWorldPosition(projected);
      projected.project(camera);
      const x = (projected.x * 0.5 + 0.5) * rect.width;
      const y = (-projected.y * 0.5 + 0.5) * rect.height;
      const d = Math.hypot(x - px, y - py);
      if (d < bestD) {
        best = piece;
        bestD = d;
      }
    }
    return best;
  }

  function pointOnBoard(ev: PointerEvent, out: THREE.Vector3) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    normal.set(0, 0, 1).applyQuaternion(root.quaternion);
    plane.setFromNormalAndCoplanarPoint(normal, root.position);
    const hit = raycaster.ray.intersectPlane(plane, hitPoint);
    if (!hit) return false;
    root.worldToLocal(out.copy(hitPoint));
    return true;
  }

  const local = new THREE.Vector3();

  function onDown(ev: PointerEvent) {
    try {
      canvas.setPointerCapture(ev.pointerId);
    } catch {
      /* synthetic events */
    }
    if (spread > 0.28) {
      const piece = pieceAt(ev);
      if (piece) {
        grab = piece;
        piece.held = true;
        if (pointOnBoard(ev, local)) {
          grabOffset.set(piece.hx - local.x, piece.hy - local.y, 0);
        } else {
          grabOffset.set(0, 0, 0);
        }
        return;
      }
    }
    pulling = true;
    pullStartX = ev.clientX;
    pullStartSpread = targetSpread;
  }

  function onMove(ev: PointerEvent) {
    if (grab && pointOnBoard(ev, local)) {
      grab.hx = local.x + grabOffset.x;
      grab.hy = local.y + grabOffset.y;
      return;
    }
    if (!pulling) return;
    const dx = ev.clientX - pullStartX;
    targetSpread = THREE.MathUtils.clamp(pullStartSpread + dx * 0.0032, 0, 1);
  }

  function onUp() {
    if (grab) grab = null;
    pulling = false;
    if (targetSpread < 0.08) {
      targetSpread = 0;
      pieces.forEach((piece) => {
        piece.held = false;
      });
    } else if (targetSpread > 0.92) {
      targetSpread = 1;
    }
  }

  function onWheel(ev: WheelEvent) {
    ev.preventDefault();
    zoomBias = THREE.MathUtils.clamp(zoomBias + ev.deltaY * 0.004, -2, 3);
  }

  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  canvas.addEventListener("wheel", onWheel, { passive: false });

  function frame() {
    if (!running) return;
    const k = reduced ? 1 : 0.1;
    spread += (targetSpread - spread) * k;
    const zoom = THREE.MathUtils.clamp(7.4 + spread * 4.2 + zoomBias, 5.4, 14);
    camera.position.z += (zoom - camera.position.z) * k;
    heroMat.opacity += ((1 - spread) - heroMat.opacity) * k;
    hero.visible = heroMat.opacity > 0.03;

    if (spread < 0.12 && !pulling) {
      pieces.forEach((piece) => {
        piece.held = false;
      });
    }

    for (const piece of pieces) {
      const tx = piece.held ? piece.hx : THREE.MathUtils.lerp(piece.homeX, piece.openX, spread);
      const ty = piece.held ? piece.hy : piece.y;
      const tz = piece.held ? 0.45 : 0.04 + spread * 0.08;
      piece.mesh.position.x += (tx - piece.mesh.position.x) * k;
      piece.mesh.position.y += (ty - piece.mesh.position.y) * k;
      piece.mesh.position.z += (tz - piece.mesh.position.z) * k;
      const mat = piece.mesh.material as THREE.MeshBasicMaterial;
      const op = piece.held ? 1 : spread;
      mat.opacity += (op - mat.opacity) * k;
      piece.mesh.visible = mat.opacity > 0.04;
      const lift = piece.held ? 1.22 : 1;
      const sx = (piece.flip ? -piece.w : piece.w) * lift;
      const sy = piece.h * lift;
      piece.mesh.scale.x += (sx - piece.mesh.scale.x) * k;
      piece.mesh.scale.y += (sy - piece.mesh.scale.y) * k;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  return {
    nudgeZoom(dir) {
      zoomBias = THREE.MathUtils.clamp(zoomBias + dir, -2, 3);
    },
    dispose() {
      running = false;
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("wheel", onWheel);
      renderer.dispose();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((item) => item.dispose());
        else mat?.dispose();
      });
    },
  };
}
