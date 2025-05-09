import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "https://unpkg.com/three@0.108.0/examples/jsm/loaders/FBXLoader.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let scene, camera, renderer;
let controls;

let model = new THREE.Object3D();
let mixers = [];

//샘플 3d 모델링 다운로드
//1. https://www.mixamo.com/
//2. https://free3d.com/ko/3d-models/fbx
//3. https://www.turbosquid.com/

const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#eee"); //배경 컬러
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 2000);
    camera.position.set(0, 40, 100);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;

    // document.body.appendChild(renderer.domElement);
    document.querySelector("#canvasWrap").appendChild(renderer.domElement);
    //cavasWrap 에 render 넣는다

    //카메라 컨트롤
    // controls = new OrbitControls(camera, renderer.domElement);

    // const axes = new THREE.AxesHelper(150);
    // scene.add(axes);

    // const gridHelper = new THREE.GridHelper(240, 20);
    // scene.add(gridHelper);

    //바닥
    const geometry = new THREE.CylinderGeometry(400, 400, 5, 100);
    const material = new THREE.MeshPhongMaterial({
        color: 0xeeeeee,
    });
    const boxMesh = new THREE.Mesh(geometry, material);
    boxMesh.position.set(0, -5, 0);
    boxMesh.receiveShadow = true;
    scene.add(boxMesh);

    {
        //조명 넣기
        var light = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
        light.position.set(100, 100, 100);
        scene.add(light);
    }
    {
        //조명
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.PointLight(color, intensity);
        light.castShadow = true;

        light.position.set(40, 120, 40);

        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.radius = 5;

        scene.add(light);
    }

    {
        //안개
        const near = 100;
        const far = 300;
        const color = "#eeeeee";
        scene.fog = new THREE.Fog(color, near, far);
    }

    fbxLoadFunc("./model/DismissingGesture.FBX");
    // fbxLoadFunc("./model/DoughNut_FBX.fbx");
};

const fbxLoadFunc = (modelName) => {
    const fbxLoader = new FBXLoader();
    fbxLoader.load(
        modelName,
        (object) => {
            console.log(object);

            object.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    // child.receiveShadow = true;
                }
            });

            //애니메이션
            object.mixer = new THREE.AnimationMixer(object);
            mixers.push(object.mixer);
            // console.log(mixers.length);

            if (mixers.length > 0) {
                let action = object.mixer.clipAction(object.animations[1]);
                action.play();
            }

            //크기 조절
            let scaleNum = 0.3;
            object.scale.set(scaleNum, scaleNum, scaleNum);

            model.add(object);
            scene.add(model);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
            console.log(error);
        }
    );
};

const clock = new THREE.Clock();

const animate = () => {
    const delta = clock.getDelta();

    for (let i = 0; i < mixers.length; i++) {
        mixers[i].update(delta);
    }

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

let scrollTop = 0;

const scrollFunc = () => {
    scrollTop = window.scrollY; //현재 스크롤 위치
    console.log(scrollTop);
    model.rotation.y = scrollTop / 2000;
    // model.position.z = scrollTop / 40;
};

window.addEventListener("scroll", scrollFunc);
