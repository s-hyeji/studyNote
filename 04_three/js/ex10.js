import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import printTree from "../mesh/tree.js";
import printHallabong from "../mesh/hallabong.js";
import printMountain from "../mesh/mountain.js";


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 30);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 빛
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(2, 4, 3);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(directionalLight, ambientLight);


const tree1 = printTree();
const hallabong1 = printHallabong();
const mountain = printMountain();
scene.add(tree1, hallabong1, mountain);

hallabong1.position.x = -5;
tree1.position.x = 5;


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
