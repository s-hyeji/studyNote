import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
camera.position.set(50, 50, 50);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0x0e2255); //배경 컬러
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
//카메라 컨트롤
controls.enableDamping = true;

{
    const axes = new THREE.AxesHelper(50);
    scene.add(axes);

    const gridHelper = new THREE.GridHelper(70, 20);
    scene.add(gridHelper);
}

{
    const HemisphereLight = new THREE.HemisphereLight(0xc0daf5, 0xc0daf5, 0.3);
    HemisphereLight.position.set(-50, 50, -50);
    scene.add(HemisphereLight);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(60, 60, 60);
    scene.add(spotLight);
}

const geometry = new THREE.BoxBufferGeometry(10, 120, 10);
const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
const boxMesh = new THREE.Mesh(geometry, material);
scene.add(boxMesh);

const animete = () => {
    controls.update();

    // boxMesh.rotation.z += 0.01;
    // boxMesh.rotation.x += 0.01;
    // boxMesh.rotation.y += 0.01;

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
