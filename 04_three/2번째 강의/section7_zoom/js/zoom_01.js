import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;
let boxGroup = new THREE.Object3D();
const totalNum = 100; //전체 박스 갯수

const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000"); //배경 컬러
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 1000);
    camera.position.set(50, 50, 150);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    //그림자 활성화

    document.body.appendChild(renderer.domElement);

    // const axes = new THREE.AxesHelper(150);
    // scene.add(axes);

    // const gridHelper = new THREE.GridHelper(240, 20);
    // scene.add(gridHelper);

    //조명 넣기
    var light = new THREE.HemisphereLight(0xffffff, 0x080820, 0.8);
    light.position.set(100, 100, 0);
    scene.add(light);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    for (let i = 0; i <= totalNum; i++) {
        addBox(i);
        // console.log(i);
    }
    scene.add(boxGroup);
    addLight(15, 15, 20);
};

const depthNum = 30; //박스와 박스 사이 z값. 깊이
let targetZNum = 0; //
let moveZ = 0;

//박스 추가
const addBox = (i) => {
    const imageMap = new THREE.TextureLoader().load(
        "https://source.unsplash.com/collection/" + i
    );

    const geometry = new THREE.BoxBufferGeometry(32, 18, 1);
    const material = new THREE.MeshPhongMaterial({
        map: imageMap,
    });
    const boxMesh = new THREE.Mesh(geometry, material);
    boxMesh.castShadow = true;

    let x = Math.random() * 100 - 100 / 2;
    let y = Math.random() * 100 - 100 / 2;
    let z = -i * depthNum;
    boxMesh.position.set(x, y, z);
    boxMesh.rotation.set(x, y, z);
    boxGroup.add(boxMesh);
};

//조명 넣기
const addLight = (...pos) => {
    const color = 0xffffff;
    const intensity = 0.4;
    const light = new THREE.PointLight(color, intensity);
    light.castShadow = true;

    light.position.set(...pos);

    const helper = new THREE.PointLightHelper(light);
    scene.add(helper);

    scene.add(light);
};

const animate = () => {
    //controls.update();

    moveZ += (targetZNum - moveZ) * 0.07;
    boxGroup.position.z = moveZ;

    camera.lookAt(scene.position);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

const stageResize = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    camera.updateProjectionMatrix();
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
};

const scrollFunc = (event) => {
    // console.log(event.deltaY);
    if (event.deltaY == -150) {
        if (targetZNum > 0) {
            targetZNum -= depthNum;
        }
    } else {
        if (targetZNum < totalNum * depthNum) {
            targetZNum += depthNum;
        }
    }
    // console.log(targetZNum);
};

init();
animate();
window.addEventListener("resize", stageResize);
window.addEventListener("wheel", scrollFunc);
