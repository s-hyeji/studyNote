import * as THREE from "three";
import { OrbitControls } from "OrbitControls";


document.body.style.margin = '0';
document.body.style.overflow = 'hidden';


console.log(THREE);
console.log(OrbitControls);



// 장면 생성
const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 1);
scene.add(light);


// OrbitControls 카메라 회전
const controls = new OrbitControls(camera, renderer.domElement);
// controls.minDistance = 2;
// controls.maxDistance = 10;
// controls.maxPolarAngle = Math.PI / 3;

controls.enableDamping = true;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 5;


const geometry = new THREE.BoxGeometry(1, 1, 1);

// 재질
const basic = new THREE.MeshBasicMaterial({
  color: 0xffaaaa,
  wireframe: true,
  wireframeLinewidth: 2,
  // transparent: true,
  // opacity: 0.5,
})

const standard = new THREE.MeshStandardMaterial({
  color: 0xffaaaa,
  // wireframe: true,
  // wireframeLinewidth: 5,
  roughness: 0.2,
  side: THREE.DoubleSide,
})

const physical = new THREE.MeshPhysicalMaterial({
  // standard 재질의 확장버전
  color: 0xffaaaa,
  clearcoat: 0.8,
  clearcoatRoughness: 0.2,
})

const phong = new THREE.MeshPhongMaterial({
  color: 0xffaaaa,
  shininess: 100,
  specular: 0x2e6ff2,
})


const mesh = new THREE.Mesh(geometry, standard);
scene.add(mesh);


function animate() {
  // obj7.rotation.y += 0.01;
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
}
animate();


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})