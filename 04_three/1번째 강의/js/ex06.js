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

// 도형
const geometry1 = new THREE.SphereGeometry(1);
const material1 = new THREE.MeshStandardMaterial({
 color: 0x2e6ff2
});
const cube = new THREE.Mesh(geometry1, material1);

const geometry2 = new THREE.PlaneGeometry(10, 10);
const material2 = new THREE.MeshStandardMaterial({
 color: 0x81a8f7,
 side: THREE.DoubleSide
});
const plane = new THREE.Mesh(geometry2, material2);
plane.rotation.x = Math.PI / -2;
plane.position.y = -1;

scene.add(cube, plane)

// 빛
// ambientLight : 모든 메쉬를 빛을 발산 하고 빛의 방향이 없음
const ambientLight = new THREE.AmbientLight(0xffffff, 3)
// scene.add(ambientLight)

// directionalLight: 햇빛과 같은 광원 (거리와 관계없이 동잃한 효과)
const directionalLight = new THREE.DirectionalLight(0xffff, 3)
directionalLight.position.set(-2, 2, 0);
// console.log(directionalLight);
// scene.add(directionalLight);

const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 1, 0xff0000);
// scene.add(dlHelper);

// pointLight
const pointLight = new THREE.PointLight(0xff0000, 3);
pointLight.position.set(1, 1, 0)
scene.add(pointLight);
const plHelper = new THREE.PointLightHelper(pointLight, 1, 0x00ff00);
scene.add(plHelper);


// Spotlight
const spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 6, 0.5)
// scene.add(spotLight);
spotLight.position.y = 2;

const slHelper = new THREE.SpotLightHelper(spotLight, 0xff0000);
// scene.add(slHelper)


// Hemisphere
const hemisphereLight = new THREE.HemisphereLight(0xffaaaa, 0x00ff00)
scene.add(hemisphereLight);


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
