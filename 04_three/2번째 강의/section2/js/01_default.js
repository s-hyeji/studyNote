import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
camera.position.set(50, 50, 50);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0x0e2255); //배경 컬러
document.body.appendChild(renderer.domElement);

{
    const axes = new THREE.AxesHelper(50);
    scene.add(axes);

    const gridHelper = new THREE.GridHelper(70, 20);
    scene.add(gridHelper);
}

const animete = () => {
    camera.lookAt(scene.position);
    //장면의 위치를 바라봄
    camera.updateProjectionMatrix();
    //변경된 값을 카메라에 적용한다

    renderer.render(scene, camera);
    requestAnimationFrame(animete);
};

const stageResize = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    //카메라 비율을 화면 비율에 맞춘다
};

animete();
window.addEventListener("resize", stageResize);
