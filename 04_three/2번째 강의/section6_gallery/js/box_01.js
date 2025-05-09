import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;

const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000"); //배경 컬러
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
    camera.position.set(0, 0, 150);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);

    document.body.appendChild(renderer.domElement);

    const axes = new THREE.AxesHelper(150);
    scene.add(axes);

    const gridHelper = new THREE.GridHelper(240, 20);
    scene.add(gridHelper);

    //조명 넣기
    var light = new THREE.HemisphereLight(0xffffff, 0x080820, 1.5);
    light.position.set(100, 100, 0);
    scene.add(light);

    controls = new OrbitControls(camera, renderer.domElement);
    // camera.lookAt(light.position);

    for (let i = 0; i < 100; i++) {
        addBox(i);
        //console.log(i);
    }
};

const addBox = (i) => {
    //값을 자유롭게 바꿔보세요.
    const geometry = new THREE.BoxBufferGeometry(5, 5, 5);
    const material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
    });
    const boxMesh = new THREE.Mesh(geometry, material);
    let x = Math.random() * 400 - 200; // - 200 ~ 200 까지 랜덤
    // let y = i * 5;
    let y = Math.random() * 400 - 200;
    let z = Math.random() * 400 - 200;
    // console.log(y);
    boxMesh.position.set(x, y, z);
    boxMesh.rotation.set(0, y, 0);
    scene.add(boxMesh);
};

const animate = () => {
    //controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

const stageResize = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    camera.updateProjectionMatrix();
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    //카메라 비율을 화면 비율에 맞춘다
};

init();
animate();
window.addEventListener("resize", stageResize);
