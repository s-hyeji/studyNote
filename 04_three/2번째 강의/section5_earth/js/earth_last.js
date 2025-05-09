import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let scene, camera, renderer;
let earth, moon, cloud;
let controls;

let cameraCenter = new THREE.Vector3();
let cameraLimit = 150;
let mouse = new THREE.Vector2();
let sceneCamera = false;

// 재미로 만들어본 코드인데, 보너스로 생각해주세요
// 설명 영상은 넣지 않았습니다.

const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000"); //배경 컬러
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
    camera.position.set(240, 60, 0);

    camera.lookAt(new THREE.Vector3(0, 0, 0));
    cameraCenter.x = camera.position.x;
    cameraCenter.y = camera.position.y;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    // renderer.setClearColor(0x000000); //배경 컬러

    document.body.appendChild(renderer.domElement);

    //카메라 컨트롤
    // controls = new OrbitControls(camera, renderer.domElement);
    // controls.minDistance = 200;
    // controls.maxDistance = 500;
    // controls.autoRotate = true; //자동 회전
    // controls.autoRotateSpeed = 0.1; //회전 속도 (기본 : 2)

    // controls.minPolarAngle = Math.radians(40);
    // controls.maxPolarAngle = Math.radians(120);

    // const axes = new THREE.AxesHelper(150);
    // scene.add(axes);

    // const gridHelper = new THREE.GridHelper(240, 20);
    // scene.add(gridHelper);

    //우주 공간 만들기
    {
        const imageLoader = new THREE.TextureLoader();
        imageLoader.load("./image/universe.jpg", (data) => {
            const material_univ = new THREE.MeshBasicMaterial({
                map: data,
                side: THREE.BackSide,
            });
            const geometry_univ = new THREE.SphereGeometry(500, 32, 32);
            const universe = new THREE.Mesh(geometry_univ, material_univ);
            scene.add(universe);
        });
    }

    //지구 만들기
    //MeshBasicMaterial -> MeshPhongMaterial 빛을 받아야해서 변경
    const earthMap = new THREE.TextureLoader().load("./image/Albedo.jpg");
    const material_earth = new THREE.MeshPhongMaterial({
        map: earthMap,
    });
    const geometry_earth = new THREE.SphereGeometry(80, 32, 32);
    //80 사이즈로 구를 만든다
    earth = new THREE.Mesh(geometry_earth, material_earth);
    earth.rotation.x = 0.3;
    //지구는 기울었으니까
    scene.add(earth);

    //구름
    const cloudMap = new THREE.TextureLoader().load("./image/Clouds.png");
    const material_cloud = new THREE.MeshPhongMaterial({
        map: cloudMap,
        transparent: true,
        opacity: 0.6,
    });
    const geometry_cloud = new THREE.SphereGeometry(82, 32, 32);
    cloud = new THREE.Mesh(geometry_cloud, material_cloud);
    // cloud.rotation.x = 0.3;
    earth.add(cloud);

    //달
    const moonMap = new THREE.TextureLoader().load("./image/moon.jpg");
    const geometry_moon = new THREE.SphereGeometry(6, 32, 32);
    const material_moon = new THREE.MeshPhongMaterial({
        map: moonMap,
    });

    moon = new THREE.Mesh(geometry_moon, material_moon);
    // moon.position.set(100, 0, 80);
    //달의 위치 잡기
    earth.add(moon);
    //지구와 한 몸? 이므로 지구에 add.

    //addLight(150, 150, 0);

    //조명 넣기
    var light = new THREE.HemisphereLight(0xffffff, 0x080820, 1.5);
    light.position.set(100, 100, -100);
    scene.add(light);

    // const helper = new THREE.HemisphereLightHelper(light, 15);
    // scene.add(helper);

    // const gridHelper2 = new THREE.GridHelper(240, 20);
    // earth.add(gridHelper2);
};

let time = 0;
const d = 120;

const animate = () => {
    earth.rotation.y += 0.0005; //지구 자전
    cloud.rotation.y += 0.0004; //지구 자전
    moon.rotation.y += 0.01; //달 자전

    time = time + 0.001;
    moon.position.x = Math.sin(time) * d; // -120 부터 120사이의 값 반복
    moon.position.z = Math.cos(time) * d; // -120 부터 120사이의 값 반복

    // controls.update();

    //카메라가 바라보는 곳
    if (sceneCamera) {
        camera.lookAt(scene.position);
    } else {
        camera.lookAt(moon.position);
    }
    camera.position.x = cameraCenter.x + cameraLimit * mouse.x;
    camera.position.y = cameraCenter.y + cameraLimit * mouse.y;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

const onDocumentMouseMove = (event) => {
    event.preventDefault();
    mouse.x = (event.clientX / WIDTH) * 2 - 1; // -1 ~ 1 까지 반환
    mouse.y = -(event.clientY / HEIGHT) * 2 + 1;
};

const onDocumentClick = (event) => {
    sceneCamera = sceneCamera ? false : true;
};

const stageResize = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    camera.updateProjectionMatrix();
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
document.addEventListener("mousemove", onDocumentMouseMove);
document.addEventListener("click", onDocumentClick);
