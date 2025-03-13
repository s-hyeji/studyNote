import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import printTree from "../mesh/tree.js";
import printHallabong from "../mesh/hallabong.js";

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


const tree1 = printTree();
const hallabong1 = printHallabong();
scene.add(tree1, hallabong1);

hallabong1.scale.set(0.5, 0.5, 0.5);
hallabong1.position.set(3, 0, 0);

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
