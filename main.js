import * as THREE from 'https://cdn.jsdelivr.net/npm/three/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Variáveis para armazenar a posição do mouse
let mouseX = 0;
let mouseY = 0;

// Atualiza a posição do cubo com base na posição do mouse
document.addEventListener('mousemove', (event) => {
    // Normaliza as coordenadas do mouse para o intervalo [-1, 1]
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Ajusta a rotação do cubo com base na posição do mouse
    cube.rotation.y = mouseX * 3; // Multiplica por 3 para expandir o movimento
    cube.rotation.x = mouseY * 3;
});

// Adiciona zoom com o scroll do mouse
document.addEventListener('wheel', (event) => {
    // Ajusta a posição Z da câmera com base no scroll
    camera.position.z += event.deltaY * 0.01;

    // Limita o zoom para evitar valores muito pequenos ou grandes
    camera.position.z = Math.max(1, Math.min(100, camera.position.z));
});

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

animate();
