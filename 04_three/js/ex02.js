import * as THREE from "three";
import { OrbitControls } from "OrbitControls";

console.log(OrbitControls);


// 1. Scene : 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
// scene.add(요소)
scene.background = new THREE.Color(0xffe287);

// 2. Camera : 신을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);

// 3. Renderer : Scene+Camera, 화면을 그려주는 역할
const renderer = new THREE.WebGLRenderer({
 alpha: true

});
renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(renderer);
document.body.appendChild(renderer.domElement)

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);


const geometry = new THREE.BoxGeometry(1, 1, 1)
const basic = new THREE.MeshBasicMaterial({
 color: 0x2e6ff2,
 // wireframe: true,
 transparent: true,
 opacity: 0.5
});

// 가장 일반적으로 사용 됨.
const standard = new THREE.MeshStandardMaterial({
 color: 0xffaaaa,
 roughness: 0.2,
 metalness: 0.1,
 // map: 
 // side: THREE.BackSide
});

const physics = new THREE.MeshPhysicalMaterial({
 color: 0xffaaaa,
 clearcoat: 0.8,
 clearcoatRoughness: 0.2
});

const phong = new THREE.MeshPhongMaterial({
 color: 0xffaaaa,
 shininess: 100,
 specular: 0x2e6ff2
});

const mesh = new THREE.Mesh(geometry, phong);
scene.add(mesh);

// const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), standard);
// scene.add(plane);

function animate() {
 renderer.render(scene, camera);
 controls.update();
 requestAnimationFrame(animate);
}
animate();

// 반응형을 위한 함수
window.addEventListener("resize", () => {
 // // 1. 카메라의 종횡비
 // camera.aspect = window.innerWidth / window.innerHeight;
 // camera.updateProjectionMatrix(); //카메라 업데이트

 // // 2. renderer의 크기
 // renderer.setSize(window.innerWidth, window.innerHeight);

});
