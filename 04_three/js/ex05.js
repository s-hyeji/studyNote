import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
// import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({});
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)
// renderer.outputEncoding = THREE.sRGBEncoding;

const light = new THREE.DirectionalLight(0xffffff, 3.1);
light.position.set(2, 4, 3);
scene.add(light);

// 한라봉
// const bodyMaterial = new THREE.MeshStandardMaterial({
//  color: 0xff7f00,
//  // wireframe: true,
// });
// const bottomGeometry = new THREE.DodecahedronGeometry(2, 1);
// const bottom = new THREE.Mesh(bottomGeometry, bodyMaterial);
// scene.add(bottom);

// const topGeometry = new THREE.TetrahedronGeometry(0.8, 3);
// const top = new THREE.Mesh(topGeometry, bodyMaterial);
// scene.add(top);
// top.position.y = 1.7;

// // 잎
// const leafMaterial = new THREE.MeshStandardMaterial({
//  color: 0x008000,
//  side: THREE.DoubleSide
// });
// const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4);
// const stem = new THREE.Mesh(stemGeometry, leafMaterial);
// scene.add(stem);
// stem.position.y = 2.5;

// const leafGeometry = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI / 3)
// const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
// scene.add(leaf);
// leaf.position.set(-0.5, 2.4, -0.1);
// leaf.rotation.z = Math.PI / -2;

// 나무
const trunk = new THREE.Group();
const trunkMaterial = new THREE.MeshStandardMaterial({
 color: 0xa38049
});
const trunkGeometry = new THREE.CylinderGeometry(0.8, 1, 1.5);
const trunk1 = new THREE.Mesh(trunkGeometry, trunkMaterial);
const trunk2 = new THREE.Mesh(trunkGeometry, trunkMaterial);
const trunk3 = new THREE.Mesh(trunkGeometry, trunkMaterial);
const trunk4 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk.add(trunk1, trunk2, trunk3, trunk4);
trunk2.position.set(0.1, 1.3, 0);
trunk3.position.set(0.2, 2.5, 0);
trunk4.position.set(0.3, 3.5, 0);
trunk2.scale.set(0.9, 0.9, 0.9);
trunk3.scale.set(0.8, 0.8, 0.8);
trunk4.scale.set(0.8, 0.8, 0.8);
trunk2.rotation.z = THREE.MathUtils.degToRad(-5);
trunk3.rotation.z = THREE.MathUtils.degToRad(-5);
trunk4.rotation.z = THREE.MathUtils.degToRad(-8);


const leaf = new THREE.Group();
const leafMaterial = new THREE.MeshStandardMaterial({
 color: 0x84ad88,
 side: THREE.DoubleSide
});
const leafGeometry = new THREE.SphereGeometry(2, 32, 16, Math.PI / 3, Math.PI / 3)
const leaf1 = new THREE.Mesh(leafGeometry, leafMaterial)
const leaf2 = new THREE.Mesh(leafGeometry, leafMaterial)
const leaf3 = new THREE.Mesh(leafGeometry, leafMaterial)
const leaf4 = new THREE.Mesh(leafGeometry, leafMaterial)
leaf.add(leaf1, leaf2, leaf3, leaf4);
leaf1.position.set(0, 3.2, 2)
leaf1.rotation.x = Math.PI / -2;
leaf2.position.set(2, 3.2, 0)
leaf2.rotation.x = Math.PI / -2;
leaf2.rotation.z = Math.PI / 2;
leaf3.position.set(0, 3.2, -2)
leaf3.rotation.x = Math.PI / -2;
leaf3.rotation.z = Math.PI;
leaf4.position.set(-2, 3.2, 0)
leaf4.rotation.x = Math.PI / -2;
leaf4.rotation.z = Math.PI / -2;

// 그룹
const tree = new THREE.Group();
tree.add(trunk, leaf)
scene.add(tree)
leaf.position.x = -0.4;
leaf.rotation.z = THREE.MathUtils.degToRad(-10);

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
