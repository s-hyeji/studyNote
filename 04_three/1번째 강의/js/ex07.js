import * as THREE from "three";
import { OrbitControls } from "OrbitControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({});
renderer.setSize(window.innerWidth, window.innerHeight);
// 그림자 추가 하기 위함
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// 도형
const geometry1 = new THREE.SphereGeometry(1);
const material1 = new THREE.MeshStandardMaterial({
 color: 0x2e6ff2,
});
const cube = new THREE.Mesh(geometry1, material1);
cube.castShadow = true; // 그림자

const geometry2 = new THREE.PlaneGeometry(10, 10);
const material2 = new THREE.MeshStandardMaterial({
 color: 0x81a8f7,
 side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry2, material2);
plane.rotation.x = Math.PI / -2;
plane.position.y = -1;
plane.receiveShadow = true; // 그림자
scene.add(cube, plane)

// 빛
const directionalLight = new THREE.DirectionalLight(0xffff, 3)
directionalLight.position.set(0, 2, 2);
scene.add(directionalLight)
// 그림자
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1000;
directionalLight.shadow.mapSize.height = 1000;
directionalLight.shadow.radius = 5;

// 카메라 컨트룰러
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotateSpeed = -10;
controls.enableDamping = true;

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
;
