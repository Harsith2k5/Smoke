/* import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.156.1/build/three.module.js';
import { VRButton } from 'https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/webxr/VRButton.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.FogExp2(0x000000, 0.05);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

// Procedural smoke texture
function createSmokeTexture(color = 'rgba(255, 255, 255, 0.12)') {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 10,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, 'transparent');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

const smokeTexture = createSmokeTexture();
const smokeMaterial = new THREE.MeshLambertMaterial({
  map: smokeTexture,
  transparent: true,
  depthWrite: false,
  side: THREE.DoubleSide,
  opacity: 1
});

// Create rising smoke particles
const particles = [];
for (let i = 0; i < 120; i++) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), smokeMaterial);

  const x = Math.random() * 20 - 10;
  const y = Math.random() * 15 - 10; // Start lower
  const z = Math.random() * 20 - 10;

  mesh.position.set(x, y, z);
  mesh.rotation.z = Math.random() * Math.PI;

  mesh.userData = {
    speedY: 0.07 + Math.random() * 0.02,
    resetY: y,
    maxY: 10 + Math.random() * 5,
    rotationSpeed: 0.002 + Math.random() * 0.005
  };

  scene.add(mesh);
  particles.push(mesh);
}

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1).normalize();
scene.add(light);

// Animate particles rising upward
function animate() {
  renderer.setAnimationLoop(() => {
    particles.forEach(p => {
      p.rotation.z += p.userData.rotationSpeed;
      p.position.y += p.userData.speedY;

      // Reset to bottom when too high
      if (p.position.y > p.userData.maxY) {
        p.position.y = p.userData.resetY - 5;
        p.position.x = Math.random() * 20 - 10;
        p.position.z = Math.random() * 20 - 10;
      }
    });

    renderer.render(scene, camera);
  });
}

animate();
 */
/* 
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.156.1/build/three.module.js';
import { VRButton } from 'https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/webxr/VRButton.js';

// 🔄 Get smoke color and opacity from URL
const urlParams = new URLSearchParams(window.location.search);
const smokeColor = urlParams.get('color') || 'rgba(255, 255, 255, 0.12)';
const smokeOpacity = parseFloat(urlParams.get('opacity')) || 1;

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.FogExp2(0x000000, 0.05);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

// 🌀 Procedural smoke texture with dynamic color
function createSmokeTexture(color = 'rgba(255, 255, 255, 0.12)') {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 10,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, 'transparent');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

const smokeTexture = createSmokeTexture(smokeColor);
const smokeMaterial = new THREE.MeshLambertMaterial({
  map: smokeTexture,
  transparent: true,
  depthWrite: false,
  side: THREE.DoubleSide,
  opacity: smokeOpacity
});

// 💨 Create rising smoke particles
const particles = [];
for (let i = 0; i < 120; i++) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), smokeMaterial);

  const x = Math.random() * 20 - 10;
  const y = Math.random() * 15 - 10;
  const z = Math.random() * 20 - 10;

  mesh.position.set(x, y, z);
  mesh.rotation.z = Math.random() * Math.PI;

  mesh.userData = {
    speedY: 0.07 + Math.random() * 0.02,
    resetY: y,
    maxY: 10 + Math.random() * 5,
    rotationSpeed: 0.002 + Math.random() * 0.005
  };

  scene.add(mesh);
  particles.push(mesh);
}

// 🔆 Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1).normalize();
scene.add(light);

// 🎥 Animate
function animate() {
  renderer.setAnimationLoop(() => {
    particles.forEach(p => {
      p.rotation.z += p.userData.rotationSpeed;
      p.position.y += p.userData.speedY;

      if (p.position.y > p.userData.maxY) {
        p.position.y = p.userData.resetY - 5;
        p.position.x = Math.random() * 20 - 10;
        p.position.z = Math.random() * 20 - 10;
      }
    });

    renderer.render(scene, camera);
  });
}

animate();
 
 */
/* import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.156.1/build/three.module.js';
import { VRButton } from 'https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/webxr/VRButton.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

// Add 360° background using a sphere
const textureLoader = new THREE.TextureLoader();
textureLoader.load('3602.jpg', function(texture) {
  const sphereGeometry = new THREE.SphereGeometry(50, 64, 64);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide
  });
  const backgroundSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(backgroundSphere);
});

// Add light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1).normalize();
scene.add(light);

// Create smoke texture (red)
function createSmokeTexture(color = 'rgba(255, 0, 0, 0.3)') {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 10, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, 'transparent');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

const smokeTexture = createSmokeTexture();
const smokeMaterial = new THREE.MeshLambertMaterial({
  map: smokeTexture,
  transparent: true,
  depthWrite: false,
  side: THREE.DoubleSide,
  opacity: 0.9 // More visible
});

// Create smoke particles
const particles = [];
for (let i = 0; i < 100; i++) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), smokeMaterial);
  const x = Math.random() * 20 - 10;
  const y = Math.random() * 15 - 10;
  const z = Math.random() * 20 - 10;

  mesh.position.set(x, y, z);
  mesh.rotation.z = Math.random() * Math.PI;

  mesh.userData = {
    speedY: 0.05 + Math.random() * 0.03, // Faster vertical movement
    resetY: y,
    maxY: 10 + Math.random() * 5,
    rotationSpeed: 0.004 + Math.random() * 0.006
  };

  scene.add(mesh);
  particles.push(mesh);
}

// Animate
renderer.setAnimationLoop(() => {
  particles.forEach(p => {
    p.rotation.z += p.userData.rotationSpeed;
    p.position.y += p.userData.speedY;

    if (p.position.y > p.userData.maxY) {
      p.position.y = p.userData.resetY - 5;
      p.position.x = Math.random() * 20 - 10;
      p.position.z = Math.random() * 20 - 10;
    }
  });

  renderer.render(scene, camera);
});
 */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.156.1/build/three.module.js';
import { VRButton } from 'https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/webxr/VRButton.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

// Background
const textureLoader = new THREE.TextureLoader();
textureLoader.load('3602.jpg', function (texture) {
  const sphereGeometry = new THREE.SphereGeometry(50, 64, 64);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide,
  });
  const backgroundSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(backgroundSphere);
});

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1).normalize();
scene.add(light);

// Smoke helper functions
function createSmokeTexture(color = 'rgba(255, 255, 255, 0.2)') {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 10, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function createLabel(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 10);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(2, 1, 1);
  return sprite;
}

// Smoke Types
const smokeTypes = [
  { color: 'rgba(255, 0, 0, 0.3)', label: 'CO', count: 30 },
  { color: 'rgba(0, 255, 0, 0.25)', label: 'NO₂', count: 30 },
  { color: 'rgba(0, 100, 255, 0.2)', label: 'SO₂', count: 20 },
  { color: 'rgba(255, 255, 0, 0.35)', label: 'CH₄', count: 20 },
];

const particles = [];

smokeTypes.forEach(({ color, label, count }) => {
  const texture = createSmokeTexture(color);
  const material = new THREE.MeshLambertMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    opacity: 0.8,
  });

  for (let i = 0; i < count; i++) {
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), material);
    const x = Math.random() * 20 - 10;
    const y = Math.random() * 10 - 10;
    const z = Math.random() * 20 - 10;
    plane.position.set(x, y, z);
    plane.rotation.z = Math.random() * Math.PI;

    const textLabel = createLabel(label);
    textLabel.position.set(0, 0, 0.1); // just above the plane
    plane.add(textLabel);

    plane.userData = {
      speedY: 0.04 + Math.random() * 0.02,
      resetY: y,
      maxY: 5 + Math.random() * 5,
      rotationSpeed: 0.002 + Math.random() * 0.004,
    };

    scene.add(plane);
    particles.push(plane);
  }
});

// Animate
renderer.setAnimationLoop(() => {
  particles.forEach(p => {
    p.rotation.z += p.userData.rotationSpeed;
    p.position.y += p.userData.speedY;
    if (p.position.y > p.userData.maxY) {
      p.position.y = p.userData.resetY - 5;
      p.position.x = Math.random() * 20 - 10;
      p.position.z = Math.random() * 20 - 10;
    }
  });

  renderer.render(scene, camera);
});
