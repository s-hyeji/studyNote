import * as THREE from "three";
import { OrbitControls } from "OrbitControls";

console.log(OrbitControls);


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
 alpha: true

});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.DodecahedronGeometry(1);
const material = new THREE.MeshStandardMaterial({
 color: 0xffaaaa
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 1. 위치
mesh.position.set(0, 2, 1);
// 2. 회전
// mesh.rotation.set(0, 360, 0);
mesh.rotation.y = THREE.MathUtils.degToRad(360);
// 3. 크기
// mesh.scale.set(1, 1, 1);
mesh.scale.x = 2;
mesh.scale.y = 0.5;


const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);


function animate() {
 renderer.render(scene, camera);
 controls.update();
 requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
 camera.aspect = window.innerWidth / window.innerHeight;
 renderer.setSize(window.innerWidth, window.innerHeight);

});
