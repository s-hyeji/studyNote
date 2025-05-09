import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let scene, camera, renderer;

//우주 공간과 지구 만들기

const init = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
    camera.position.set(240, 60, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xffffff); //배경 컬러
    document.body.appendChild(renderer.domElement);

    //카메라 컨트롤
    const controls = new OrbitControls(camera, renderer.domElement);

    // const axes = new THREE.AxesHelper(150);
    // scene.add(axes);

    // const gridHelper = new THREE.GridHelper(250, 20);
    // scene.add(gridHelper);

    //우주 공간 만들기
    {
        const imageLoader = new THREE.TextureLoader();
        imageLoader.load("./image/universe.jpg", (data) => {
            const material_univ = new THREE.MeshBasicMaterial({
                map: data,
                side: THREE.BackSide,
            });
            const geometry_univ = new THREE.SphereGeometry(400, 32, 32);
            const universe = new THREE.Mesh(geometry_univ, material_univ);
            scene.add(universe);
        });
    }

    //지구 만들기
    {
        const imageLoader = new THREE.TextureLoader();
        //텍스쳐 로더
        imageLoader.load("./image/earth.jpg", (data) => {
            const material_earth = new THREE.MeshBasicMaterial({
                map: data,
            });
            //로드한 '지구이미지'를 map으로 생성
            const geometry_earth = new THREE.SphereGeometry(80, 32, 32);
            //(지)구 생성
            const earth = new THREE.Mesh(geometry_earth, material_earth);
            scene.add(earth);
        });
    }
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
