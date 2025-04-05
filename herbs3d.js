import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5).normalize();
scene.add(light);

const loader = new GLTFLoader();

const plantFiles = [
  { name: 'Ashwagandha', path: 'models/Ahwagandha.glb', position: [-1.5, 0, 0] },
  { name: 'Cardamom', path: 'models/Cardamom.glb', position: [3, 0, 0] },
  { name: 'Cinnamon', path: 'models/Cinnamon.glb', position: [1.5, 0, 0] },
  {name: 'Clove', path: 'models/Cloven.glb',position: [0, 0, 0] },
  { name: 'tulsi', path: 'models/tulsi.glb', position: [-3, 0, 0] },
  { name: 'Turmeric', path: 'models/Turmeric.glb', position: [0, 0, 0] }
];

plantFiles.forEach(({ name, path, position }) => {
  loader.load(path, function (gltf) {
    const model = gltf.scene;
    model.position.set(...position);
    model.scale.set(0.5, 0.5, 0.5);
    scene.add(model);
  }, undefined, function (error) {
    console.error(`Error loading ${name}:`, error);
  });
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
