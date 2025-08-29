// ====== CONFIG ======
const CONFIG = {
  count: 60,               // number of butterflies
  areaSize: 80,            // logical world size (bigger => more spread out)
  baseSpeed: 0.35,         // overall movement speed
  swirlAmp: 3.5,           // amplitude of the sinusoidal "flutter"
  swirlFreq: 0.8,          // frequency of flutter
  drift: 0.25,             // slow random drift
  spriteScale: [0.6, 1.35],// min/max scale per sprite
  depthRange: [-35, 20],   // z-range distribution
  tintColor: 0x88ccff,     // fog-ish tint for scene lights
  bgColor: 0x05070b,       // renderer clear color (matches CSS)
  textureUrl: "assets/butterfly.png" // your transparent PNG
};
// =====================

let renderer, scene, camera, clock, butterflies = [];
let container = document.getElementById("butterfly-bg");

init();
animate();

function init() {
  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  resize();
  renderer.setClearColor(CONFIG.bgColor, 1);
  container.appendChild(renderer.domElement);

  // scene
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
  camera.position.set(0, 0, 70);
  scene.add(camera);

  // subtle fog for depth
  scene.fog = new THREE.FogExp2(CONFIG.bgColor, 0.02);

  // lights (soft, cool)
  const hemi = new THREE.HemisphereLight(0x99ccff, 0x0a0a12, 0.6);
  scene.add(hemi);
  const dir = new THREE.DirectionalLight(0xaad4ff, 0.35);
  dir.position.set(2, 3, 2);
  scene.add(dir);

  // load butterfly texture
  const loader = new THREE.TextureLoader();
  loader.load(CONFIG.textureUrl, (tex) => {
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    tex.generateMipmaps = true;
    createButterflies(tex);
  });

  // clock for smooth delta timing
  clock = new THREE.Clock();

  // responsive
  window.addEventListener("resize", resize);
}

function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (renderer) renderer.setSize(w, h, false);
  if (camera) {
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
}

function createButterflies(texture) {
  const spriteMat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  });

  for (let i = 0; i < CONFIG.count; i++) {
    const sprite = new THREE.Sprite(spriteMat.clone());

    // random scale
    const s = randRange(CONFIG.spriteScale[0], CONFIG.spriteScale[1]);
    sprite.scale.set(s * 2.0, s * 2.0, 1);

    // random starting pos
    sprite.position.set(
      randRange(-CONFIG.areaSize, CONFIG.areaSize),
      randRange(-CONFIG.areaSize * 0.6, CONFIG.areaSize * 0.6),
      randRange(CONFIG.depthRange[0], CONFIG.depthRange[1])
    );

    // motion parameters
    sprite.userData = {
      base: sprite.position.clone(),          // reference center
      vel: new THREE.Vector3(
        randRange(-CONFIG.baseSpeed, CONFIG.baseSpeed),
        randRange(-CONFIG.baseSpeed * 0.6, CONFIG.baseSpeed * 0.6),
        randRange(-CONFIG.baseSpeed * 0.4, CONFIG.baseSpeed * 0.4)
      ),
      phase: Math.random() * Math.PI * 2,     // flutter offset
      phaseSpeed: randRange(0.5, 1.3) * CONFIG.swirlFreq,
      drift: new THREE.Vector3(
        randRange(-CONFIG.drift, CONFIG.drift),
        randRange(-CONFIG.drift, CONFIG.drift),
        randRange(-CONFIG.drift, CONFIG.drift)
      )
    };

    scene.add(sprite);
    butterflies.push(sprite);
  }
}

function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  update(dt);
  renderer.render(scene, camera);
}

function update(dt) {
  // gentle camera bob for parallax depth
  const t = performance.now() * 0.00015;
  camera.position.x = Math.sin(t) * 2.0;
  camera.position.y = Math.cos(t * 0.8) * 1.2;
  camera.lookAt(0, 0, 0);

  butterflies.forEach((b) => {
    const u = b.userData;
    if (!u) return;

    // update phase (flutter)
    u.phase += u.phaseSpeed * dt;

    // apply base velocity + slow drift
    b.position.addScaledVector(u.vel, dt * 60 * 0.016);   // normalize to ~60fps
    b.position.addScaledVector(u.drift, dt * 0.5);

    // sinusoidal flutter around base position
    b.position.x += Math.sin(u.phase) * (CONFIG.swirlAmp * dt);
    b.position.y += Math.cos(u.phase * 0.9) * (CONFIG.swirlAmp * 0.7 * dt);

    // soft rotation (gives a little life)
    b.material.rotation = Math.sin(u.phase * 1.3) * 0.35;

    // wrap around bounds to keep them in view
    wrap(b.position);
  });
}

function wrap(p) {
  const a = CONFIG.areaSize;
  const yA = a * 0.7;
  if (p.x > a) p.x = -a; else if (p.x < -a) p.x = a;
  if (p.y > yA) p.y = -yA; else if (p.y < -yA) p.y = yA;
  const zMin = CONFIG.depthRange[0], zMax = CONFIG.depthRange[1];
  if (p.z > zMax) p.z = zMin; else if (p.z < zMin) p.z = zMax;
}

function randRange(min, max) {
  return Math.random() * (max - min) + min;
}
