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

// 텍스처
const loader = new THREE.TextureLoader();

const baseColor = loader.load('./images/bark_basecolor.jpg');
const normal = loader.load('./images/bark_normal.jpg');
const height = loader.load('./images/bark_height.png');
const roughness = loader.load('./images/bark_roughness.jpg');
baseColor.colorSpace = THREE.SRGBColorSpace;
normal.colorSpace = THREE.SRGBColorSpace;

// 도형
const geometry1 = new THREE.SphereGeometry(1);
const material1 = new THREE.MeshStandardMaterial({
 // color: 0x2e6ff2,
 map: baseColor,
 normalMap: normal,
 // normalScale: new THREE.Vector2(0, 0),
 roughness: 0.4,
 roughnessMap: roughness,

 displacementMap: height,
 displacementScale: 0.2,
});
const cube = new THREE.Mesh(geometry1, material1);

const geometry2 = new THREE.PlaneGeometry(10, 10);
const material2 = new THREE.MeshStandardMaterial({
 color: 0x81a8f7,
 side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry2, material2);
plane.rotation.x = Math.PI / -2;
plane.position.y = -1;

scene.add(cube, plane)

// 빛
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(0, 2, 2);
scene.add(directionalLight);




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
