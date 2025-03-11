import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
// import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({});
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)
// renderer.outputEncoding = THREE.sRGBEncoding;

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 4, 3);
scene.add(light);
// const ambientLight = new THREE.AmbientLight(0xffffff, 1); // 약간의 주변광 추가
// scene.add(ambientLight);

// 한라봉
const material1 = new THREE.MeshPhongMaterial({
 color: 0xff7f00,
 shininess: 100,
});
const material2 = new THREE.MeshStandardMaterial({
 color: 0xff7f00,
 roughness: 0.3,
 metalness: 0.3,
});
const bodyMaterial = new THREE.MeshStandardMaterial({
 color: 0xff7f00,
 // emissive: 0xff4500, // 따뜻한 색 계열의 미세한 자체 발광
 // emissiveIntensity: 0.2
});
const bottomGemetry = new THREE.DodecahedronGeometry(2, 1);
const bottom = new THREE.Mesh(bottomGemetry, material1);
scene.add(bottom);



function animate() {
 controls.update();
 renderer.render(scene, camera);
 requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
 camera.aspect = window.innerWidth / window.innerHeight;
 renderer.setSize(window.innerWidth, window.innerHeight);

});
