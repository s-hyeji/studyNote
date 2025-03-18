import * as THREE from "three";
import { OrbitControls } from "OrbitControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 빛
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(3, 3, 3);
scene.add(directionalLight);

const Stone = new THREE.Group();
// 텍스처
const textureLoader = new THREE.TextureLoader();
const stoneBase = textureLoader.load('./images/stone_basecolor.jpg')
const stoneNormal = textureLoader.load('./images/stone_normal.jpg')
const stoneRoughness = textureLoader.load('./images/stone_roughness.jpg')

const stoneMaterial = new THREE.MeshStandardMaterial({
  color: 0x565656,
  map: stoneBase,
  normalMap: stoneNormal,
  roughnessMap: stoneRoughness,
  roughness: 0.8,
});


const headGeometry = new THREE.CylinderGeometry(0.9, 1.5, 4, 4);
headGeometry.computeVertexNormals();
headGeometry.attributes.uv.needsUpdate = true;
const head = new THREE.Mesh(headGeometry, stoneMaterial);
head.rotation.y = Math.PI / 4;
Stone.add(head);

const hatGeometry = new THREE.BoxGeometry(2, 0.2, 2);
const hat = new THREE.Mesh(hatGeometry, stoneMaterial);
hat.position.y = 1.5;
Stone.add(hat);


const armGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1.6, 6);
const armLeft = new THREE.Mesh(armGeometry, stoneMaterial);
armLeft.position.set(-1.3, -0.1, 0);
armLeft.rotation.z = Math.PI / 3;
const armRight = new THREE.Mesh(armGeometry, stoneMaterial);
armRight.position.set(1.3, -0.1, 0);
armRight.rotation.z = Math.PI / -3;
Stone.add(armLeft, armRight);


const eyeGeometry = new THREE.CapsuleGeometry(0.3, 0.2);
const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })
const eyeLeft = new THREE.Mesh(eyeGeometry, eyeMaterial);
eyeLeft.position.set(-0.23, 0.5, 0.63);
Stone.add(eyeLeft);
const eyeRight = new THREE.Mesh(eyeGeometry, eyeMaterial);
eyeRight.position.set(0.23, 0.5, 0.63);
Stone.add(eyeRight);

scene.add(Stone);

// 카메라 컨트룰러
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotateSpeed = -10;
controls.enableDamping = true;

// 축 추가
const axex = new THREE.AxesHelper(10);
scene.add(axex);

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
