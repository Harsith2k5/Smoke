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

// 🌊 360° background
const loader = new THREE.TextureLoader();
loader.load('flood_360.jpg', tex => {
  const bg = new THREE.Mesh(
    new THREE.SphereGeometry(50, 64, 64),
    new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide })
  );
  scene.add(bg);
});

// 💡 Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 2, 2);
scene.add(light);

// 💧 Create water plane
const waterGeo = new THREE.PlaneGeometry(100, 100);
const waterMat = new THREE.MeshPhongMaterial({ color: 0x0033ff, transparent: true, opacity: 0.4 });
const water = new THREE.Mesh(waterGeo, waterMat);
water.rotation.x = -Math.PI / 2;
water.position.y = -5;
scene.add(water);

// 📍 Floating text for sensor info
function createLabelCanvas(text, color = 'white') {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(text, 256, 80);
  return new THREE.CanvasTexture(canvas);
}

let infoSprite;
function updateInfoPanel(text, color) {
  if (infoSprite) scene.remove(infoSprite);
  const tex = createLabelCanvas(text, color);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
  infoSprite = new THREE.Sprite(mat);
  infoSprite.scale.set(10, 2.5, 1);
  infoSprite.position.set(0, 5, -6);
  scene.add(infoSprite);
}

// 🚨 Warning beacon
const beaconGeo = new THREE.SphereGeometry(0.5, 32, 32);
const beaconMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const beacon = new THREE.Mesh(beaconGeo, beaconMat);
beacon.position.set(0, 1, -3);
scene.add(beacon);

// 🔁 Animate
function animate() {
  renderer.setAnimationLoop(() => {
    water.material.opacity = 0.4 + 0.05 * Math.sin(Date.now() * 0.002);
    renderer.render(scene, camera);
  });
}
animate();

// 🌐 Fetch live ESP32 sensor data
const ESP32_IP = "http://192.168.43.XXX"; // replace with your ESP32 local IP

async function fetchData() {
  try {
    const res = await fetch(`${ESP32_IP}/data`);
    const data = await res.json();

    const { distance, temperature, humidity, gas, floodStatus } = data;

    // Update water level
    const height = THREE.MathUtils.mapLinear(distance, 5, 30, 5, -5);
    water.position.y = Math.max(-5, Math.min(5, height));

    // Update info panel & beacon color
    if (floodStatus === "DANGER") {
      updateInfoPanel(`🚨 FLOOD ALERT!\nWater: ${distance}cm\nTemp: ${temperature}°C`, 'red');
      beacon.material.color.set(0xff0000);
    } else if (floodStatus === "WARNING") {
      updateInfoPanel(`⚠️ Rising Water!\n${distance}cm`, 'yellow');
      beacon.material.color.set(0xffff00);
    } else {
      updateInfoPanel(`✅ Safe Level: ${distance}cm`, 'lime');
      beacon.material.color.set(0x00ff00);
    }

  } catch (e) {
    console.error("Fetch error:", e);
  }
}

// 🔁 Poll ESP32 every 3 seconds
setInterval(fetchData, 3000);
