import * as THREE from "three";
const $result = document.querySelector("#result");

// 1. Scene : 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
// scene.add(요소)
scene.background = new THREE.Color(0xffe287);

// 2. Camera : 신을 바라볼 시점을 결정
const camere = new THREE.PerspectiveCamera(50, $result.clientWidth / $result.clientHeight, 0.1, 1000);
camere.position.set(2, 2, 2);
camere.lookAt(0, 0, 0);

// 3. Renderer : Scene+Camera, 화면을 그려주는 역할
const renderer = new THREE.WebGLRenderer({
 canvas: $result, antialias: true
});
renderer.setSize($result.clientWidth, $result.clientHeight);
// console.log(renderer);
// document.body.appendChild(renderer.domElement)

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
 color: 0x2e6ff2
});
const box = new THREE.Mesh(geometry, material);
scene.add(box, light);
renderer.render(scene, camere);



