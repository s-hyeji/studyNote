import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let scene, camera, renderer;
let controls;
// let windowHalfX = WIDTH / 2;
// let windowHalfY = HEIGHT / 2;
const carGroup = new THREE.Group();
const wheel_front_Group = new THREE.Group();
const wheel_back_Group = new THREE.Group();

const init = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
    camera.position.set(50, 50, 50);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x0e2255); //배경 컬러
    document.body.appendChild(renderer.domElement);

    //카메라 컨트롤
    controls = new OrbitControls(camera, renderer.domElement);
    controls.minPolarAngle = Math.radians(20);
    controls.maxPolarAngle = Math.radians(120);
    // controls.target.set(0, 10, 0);
    // controls.autoRotate = true;
    // controls.autoRotateSpeed = 1;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    {
        const axes = new THREE.AxesHelper(50);
        scene.add(axes);

        const gridHelper = new THREE.GridHelper(70, 20);
        scene.add(gridHelper);
    }

    {
        //직사광
        const color = 0xffffff;
        const intensity = 1.3;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(20, 80, 50);
        light.target.position.set(0, 20, 0);
        scene.add(light);
        scene.add(light.target);
        // const helper = new THREE.DirectionalLightHelper(light, 5);
        // scene.add(helper);
    }

    {
        //원뿔형 스팟 조명
        const color = 0xffffff;
        const intensity = 0.5;
        const light = new THREE.SpotLight(color, intensity);
        light.position.set(-20, 40, -50);
        scene.add(light);
        scene.add(light.target);
        // const helper = new THREE.SpotLightHelper(light);
        // scene.add(helper);
    }

    //기본 도형
    const geometry = new THREE.BoxGeometry(20, 12, 30);
    const material = new THREE.MeshPhongMaterial({ color: 0xffd400 });
    const boxMesh = new THREE.Mesh(geometry, material);

    const geometry_top = new THREE.BoxGeometry(14, 8, 20);
    const boxMesh_top = new THREE.Mesh(geometry_top, material);
    boxMesh_top.position.set(0, 10, -2);

    carGroup.add(boxMesh, boxMesh_top);

    const geometry_cylinder = new THREE.CylinderGeometry(5, 5, 3, 10);
    const material_cylinder = new THREE.MeshPhongMaterial({
        color: 0x000000,
        // wireframe: true,
    });

    const wheel = new THREE.Mesh(geometry_cylinder, material_cylinder);
    wheel.rotateZ(Math.radians(90));

    const wheel_front_L = wheel.clone();
    wheel_front_L.position.x = -12;
    wheel_front_Group.add(wheel_front_L);

    const wheel_front_R = wheel.clone();
    wheel_front_R.position.x = 12;
    wheel_front_Group.add(wheel_front_R);

    wheel_front_Group.position.set(0, -4, 8);
    carGroup.add(wheel_front_Group);
    //앞바퀴

    const wheel_back_L = wheel.clone();
    wheel_back_L.position.x = -12;
    wheel_back_Group.add(wheel_back_L);

    const wheel_back_R = wheel.clone();
    wheel_back_R.position.x = 12;
    wheel_back_Group.add(wheel_back_R);

    wheel_back_Group.position.set(0, -4, -8);
    carGroup.add(wheel_back_Group);
    //뒷바퀴

    carGroup.position.y = 9;
    scene.add(carGroup);

    document.addEventListener("keydown", onDocumentKeyDown);
    document.addEventListener("keyup", onDocumentKeyUp);
    //마우스 이벤트

    console.log(wheel_front_Group);
};

let keyCode = 0;
let keyDownChk = false;

const onDocumentKeyDown = (event) => {
    keyCode = event.key || event.keyCode;
    console.log(event.key, event.keyCode);
    // console.log(keyCode);
    keyDownChk = true;
};
const onDocumentKeyUp = (event) => {
    keyDownChk = false;
};

const animate = () => {
    if (keyDownChk) {
        if (keyCode == "ArrowUp" || keyCode == 38) {
            console.log("앞으로");
            carGroup.position.z = carGroup.position.z + 1;
            wheel_front_Group.children.forEach((item) => {
                item.rotation.x = item.rotation.x + 0.1;
            });
            wheel_back_Group.children.forEach((item) => {
                item.rotation.x = item.rotation.x + 0.1;
            });
        } else if (keyCode == "ArrowDown" || keyCode == 40) {
            console.log("뒤로");
            carGroup.position.z = carGroup.position.z - 1;
            wheel_front_Group.children.forEach((item) => {
                item.rotation.x = item.rotation.x - 0.1;
            });
            wheel_back_Group.children.forEach((item) => {
                item.rotation.x = item.rotation.x - 0.1;
            });
        }
    }

    camera.lookAt(scene.position);
    //장면의 위치를 바라봄
    camera.updateProjectionMatrix();
    //변경된 값을 카메라에 적용한다

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

const stageResize = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    // windowHalfX = WIDTH / 2;
    // windowHalfY = HEIGHT / 2;

    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    //카메라 비율을 화면 비율에 맞춘다
};

Math.radians = (degrees) => {
    return (degrees * Math.PI) / 180;
};

init();
animate();
window.addEventListener("resize", stageResize);
