import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let scene, camera, renderer;

//sphere 만들기

const init = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
    camera.position.set(200, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x00000); //배경 컬러
    document.body.appendChild(renderer.domElement);

    //카메라 컨트롤
    const controls = new OrbitControls(camera, renderer.domElement);

    //지구 만들기
    const geometry = new THREE.SphereGeometry(15, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
};

const animate = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

const stageResize = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    //카메라 비율을 화면 비율에 맞춘다

    camera.updateProjectionMatrix();
    //변경된 값을 카메라에 적용한다
};

init();
animate();
window.addEventListener("resize", stageResize);
