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


import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.156.1/build/three.module.js';
import { VRButton } from 'https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/webxr/VRButton.js';
import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/loaders/RGBELoader.js';

// 🔄 Get smoke color and opacity from URL
const urlParams = new URLSearchParams(window.location.search);
const smokeColor = urlParams.get('color') || 'rgba(255, 255, 255, 0.12)';
const smokeOpacity = parseFloat(urlParams.get('opacity')) || 1;

// Scene setup
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.05);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

// 🔥 Background HDRI setup (Industrial Sunset)
const hdrLoader = new RGBELoader();
hdrLoader.load('industrial_sunset_4k.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});

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
