import * as THREE from "three";

// 1. Scene : 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
// scene.add(요소)
scene.background = new THREE.Color(0xffe287);

// 2. Camera : 신을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

// 3. Renderer : Scene+Camera, 화면을 그려주는 역할
const renderer = new THREE.WebGLRenderer({
 alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);

const material = new THREE.MeshStandardMaterial({
 color: 0x2e6ff2
});

// 육면체
const geo1 = new THREE.BoxGeometry(1, 1, 1);
const obj1 = new THREE.Mesh(geo1, material);
// scene.add(obj1);

// 원뿔
const geo2 = new THREE.ConeGeometry(0.5, 1, 32);
const obj2 = new THREE.Mesh(geo2, material);
scene.add(obj2);

// 원기둥
const geo3 = new THREE.CylinderGeometry(0.5, 0.8, 1);
const obj3 = new THREE.Mesh(geo3, material);
// scene.add(obj3);

// 구 
const geo4 = new THREE.SphereGeometry(1);
const obj4 = new THREE.Mesh(geo4, material);
// scene.add(obj4);

// 평면
const geo5 = new THREE.PlaneGeometry(1, 2);
const obj5 = new THREE.Mesh(geo5, material);
// scene.add(obj5);

// 원
const geo6 = new THREE.CircleGeometry(1, 32);
const obj6 = new THREE.Mesh(geo6, material);
// scene.add(obj6);

// 큐브
const geo7 = new THREE.TorusGeometry(1, 0.3);
const obj7 = new THREE.Mesh(geo7, material);
// scene.add(obj7);


function animate() {
 // box.rotation.y += 0.01;
 // box.rotation.x += 0.01;
 // console.log(box.rotation.y);
 renderer.render(scene, camera);

 requestAnimationFrame(animate);
}
animate();

// 반응형을 위한 함수
window.addEventListener("resize", () => {
 // 1. 카메라의 종횡비
 camera.aspect = window.innerWidth / window.innerHeight;
 camera.updateProjectionMatrix(); //카메라 업데이트

 // 2. renderer의 크기
 renderer.setSize(window.innerWidth, window.innerHeight);

});
