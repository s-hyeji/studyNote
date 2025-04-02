import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import printIsland from "../mesh/island.js";
import printTree from "../mesh/tree.js";
import printTangerine from "../mesh/hallabong.js";
import printMountain from "../mesh/mountain.js";
import printStone from "../mesh/stone.js";
import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";



const scene = new THREE.Scene();
scene.background = new THREE.Color(0x7ccad5);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true

// 도형
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshStandardMaterial({
//  color: 0xffe272,
// })
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// 섬
const island = printIsland();
island.position.y = -1.5;
scene.add(island)

// 한라봉
const tangerine = printTangerine();
tangerine.position.set(-5, 0, -1);
scene.add(tangerine);
const miniTan = printTangerine();
miniTan.scale.set(0.7, 0.7, 0.7);
miniTan.position.set(-6, 0, 1.5);
scene.add(miniTan);
console.log(miniTan);

// 나무
const tree = printTree();
tree.position.set(5, -0.5, -1);
tree.rotation.y = Math.PI / -3;
scene.add(tree);
const miniTree = printTree();
miniTree.position.set(6.5, -1, 1);
miniTree.scale.set(0.6, 0.6, 0.6);
scene.add(miniTree);

// 한라산?
const mountain = printMountain();
mountain.scale.set(1.2, 1.6, 1);
mountain.position.set(0, 1, -1.7);
scene.add(mountain);

// 
const myChar = printStone();
myChar.position.set(3, 0.5, 1);
myChar.scale.set(0.9, 0.9, 0.9)
myChar.rotation.y = Math.PI / -8
scene.add(myChar);
// 


const modelLoader = new GLTFLoader();
modelLoader.load('./models/shiba.glb', (gltf) => {
 const model = gltf.scene
 model.position.set(-3, 1.2, 3.5);
 model.scale.set(2.5, 2.5, 2.5);
 model.castShadow = true;
 scene.add(model);

 console.log(model);
})

// 빛
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionLight = new THREE.DirectionalLight(0xffffff, 5);
directionLight.position.set(-10, 10, 10);
scene.add(directionLight);
directionLight.castShadow = true


const pl2 = new THREE.PointLight(0xffe287, 10);
pl2.position.set(-3, 2, 0);
scene.add(pl2);

// 카메라 컨트룰러
const controls = new OrbitControls(camera, renderer.domElement);
// controls.autoRotate = true;
controls.autoRotateSpeed = -1;
controls.enableDamping = true;
// controls.minDistance = 5;
// controls.maxDistance = 10;


function animate() {
 controls.update();

 renderer.render(scene, camera);
 requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
 console.log("dd");

 camera.aspect = window.innerWidth / window.innerHeight;
 camera.updateProjectionMatrix();
 renderer.setSize(window.innerWidth, window.innerHeight);
});