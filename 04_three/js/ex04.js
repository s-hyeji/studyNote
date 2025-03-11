import * as THREE from "three";
import { OrbitControls } from "OrbitControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 3, 3);
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
// 조작설정
// controls.enableZoom = false;
// controls.enableRotate = false;
// controls.enablePan = false;

// 줌 범위 조절
controls.minDistance = 2;
controls.maxDistance = 10;
// 회전 각도 조절
// controls.maxPolarAngle = Math.PI / 3;
// 자동 회전
// controls.autoRotate = true;
// controls.autoRotateSpeed = 4;
// 움직임 부드럽게
controls.enableDamping = true;



const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
 color: 0xffaaaa
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);


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
