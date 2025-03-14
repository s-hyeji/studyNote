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


const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(2, 4, 3);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(directionalLight, ambientLight);


// 박스
const geometry = new THREE.BoxGeometry(1.5, 1, 1);
const material = new THREE.MeshStandardMaterial({
 color: 0xffaaaa
})
const materials = [
 new THREE.MeshStandardMaterial({ color: 0xffaaaa }), // 연한 핑크
 new THREE.MeshStandardMaterial({ color: 0xaaffcc }), // 민트
 new THREE.MeshStandardMaterial({ color: 0xd8aaff }), // 라벤더
 new THREE.MeshStandardMaterial({ color: 0xaabbee }), // 베이비 블루
 new THREE.MeshStandardMaterial({ color: 0xffe6b3 }), // 크림색
 new THREE.MeshStandardMaterial({ color: 0x80dfff })  // 하늘색
]
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);
// 빛




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
