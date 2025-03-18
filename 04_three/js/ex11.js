import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import printStone from "../mesh/stone.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0.3, 3.2, 9.3);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 빛
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(3, 3, 3);
scene.add(directionalLight);

const stone = printStone();
scene.add(stone);


// 카메라 컨트룰러
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotateSpeed = -10;
controls.enableDamping = true;

// 축 추가
const axex = new THREE.AxesHelper(10);
scene.add(axex);
function animate() {
  controls.update();
  // console.log("Camera Position:", camera.position.x, camera.position.y, camera.position.z);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);

});
;
