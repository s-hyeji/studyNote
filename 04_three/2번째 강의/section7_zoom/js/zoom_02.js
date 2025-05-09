import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let scene, camera, renderer, controls;
let boxGroup = new THREE.Group();

const totalNum = 100; //전체 박스 갯수
const depthNum = 30; //박스와 박스 사이 z값. 깊이
const totalDepthNum = totalNum * depthNum; //전체 깊이

let targetZNum = 0;
let moveZ = 0;
let mouseX = 0,
    mouseY = 0,
    moveX = 0,
    moveY = 0;

const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000"); //배경 컬러 #6fbdff
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 1000);
    camera.position.set(0, 0, 50);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    //그림자 활성화
    document.body.appendChild(renderer.domElement);

    //안개
    const near = 100;
    const far = 300;
    const color = "#000000";
    scene.fog = new THREE.Fog(color, near, far);

    // const axes = new THREE.AxesHelper(150);
    // scene.add(axes);

    // const gridHelper = new THREE.GridHelper(240, 20);
    // scene.add(gridHelper);

    //조명 넣기
    var light = new THREE.HemisphereLight(0xffffff, 0x080820, 0.8);
    light.position.set(100, 100, 0);
    scene.add(light);

    // controls = new OrbitControls(camera, renderer.domElement);

    for (let i = 0; i <= totalNum; i++) {
        addBox(i);
        // console.log(i);
    }
    scene.add(boxGroup);
    addLight(15, 15, 20);
};

//박스 추가
const addBox = (i) => {
    const imageMap = new THREE.TextureLoader().load(
        "https://source.unsplash.com/collection/" + i
    );

    const material = new THREE.SpriteMaterial({ map: imageMap });
    const boxMesh = new THREE.Sprite(material);
    boxMesh.scale.set(32, 18, 1);

    let x = Math.random() * 100 - 100 / 2;
    let y = Math.random() * 50 - 50 / 2;
    let z = -i * depthNum;
    boxMesh.position.set(x, y, z);
    // boxMesh.rotation.set(0, y, 0);
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
    targetZNum += 0.2;
    moveZ += (targetZNum - moveZ) * 0.07;
    boxGroup.position.z = moveZ;

    moveX += (mouseX - moveX - WIDTH / 2) * 0.05;
    moveY += (mouseY - moveY - WIDTH / 2) * 0.05;

    boxGroup.position.x = -(moveX / 50);
    boxGroup.position.y = moveY / 50;

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
    if (event.deltaY < 0) {
        if (targetZNum > 0) {
            targetZNum -= depthNum;
        }
    } else {
        if (targetZNum < totalDepthNum) {
            targetZNum += depthNum;
        }
    }
    console.log(targetZNum);
    // targetNum = event.deltaY;
};

init();
animate();
window.addEventListener("resize", stageResize);
window.addEventListener("wheel", scrollFunc);
window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
