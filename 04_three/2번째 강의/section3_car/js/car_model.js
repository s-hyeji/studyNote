import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let scene, camera, renderer;

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
    const controls = new OrbitControls(camera, renderer.domElement);
    // {
    const axes = new THREE.AxesHelper(50);
    scene.add(axes);

    //     const gridHelper = new THREE.GridHelper(70, 20);
    //     scene.add(gridHelper);
    // }

    {
        const HemisphereLight = new THREE.HemisphereLight(
            0xc0daf5,
            0xc0daf5,
            0.3
        );
        HemisphereLight.position.set(-50, 50, -50);
        scene.add(HemisphereLight);

        const spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(60, 60, 90);
        scene.add(spotLight);
    }

    //기본 도형
    const geometry = new THREE.BoxGeometry(20, 12, 30);
    const material = new THREE.MeshPhongMaterial({
        color: 0xffd400,
        // wireframe: true,
    });
    const boxMesh = new THREE.Mesh(geometry, material);
    carGroup.add(boxMesh);
    //차 하단

    const geometry_top = new THREE.BoxGeometry(14, 8, 20);
    const boxMesh_top = new THREE.Mesh(geometry_top, material);
    boxMesh_top.position.set(0, 10, -2);
    carGroup.add(boxMesh_top);
    //차 상단

    const geometry_cylinder = new THREE.CylinderGeometry(5, 5, 3, 10);
    const material_cylinder = new THREE.MeshPhongMaterial({
        color: 0x000000,
        // wireframe: true,
    });

    //앞바퀴
    const wheel = new THREE.Mesh(geometry_cylinder, material_cylinder);
    wheel.rotateZ(Math.radians(90));
    wheel.position.set(-12, -4, 8);
    carGroup.add(wheel);

    const wheel_clone2 = wheel.clone(); //복사
    wheel_clone2.position.set(12, -4, 8);
    carGroup.add(wheel_clone2);

    //뒷바퀴
    const wheel_clone3 = wheel.clone();
    wheel_clone3.position.set(-12, -4, -8);
    carGroup.add(wheel_clone3);

    const wheel_clone4 = wheel.clone();
    wheel_clone4.position.set(12, -4, -8);
    carGroup.add(wheel_clone4);

    scene.add(carGroup);
};

Math.radians = (degrees) => {
    return (degrees * Math.PI) / 180;
};

const animate = () => {
    camera.lookAt(scene.position);
    //장면의 위치를 바라봄
    camera.updateProjectionMatrix();
    //변경된 값을 카메라에 적용한다

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

const stageResize = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    //카메라 비율을 화면 비율에 맞춘다
};

init();
animate();
window.addEventListener("resize", stageResize);
