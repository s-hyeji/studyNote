import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { FBXLoader } from "https://unpkg.com/three@0.108.0/examples/jsm/loaders/FBXLoader.js";

let WIDTH = 500;
let HEIGHT = 500;

let scene, camera, renderer;

let model = new THREE.Object3D();
let modelBody = new THREE.Object3D();

const init = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(35, WIDTH / HEIGHT, 1, 500);
    camera.position.set(0, 20, 190);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    //alpha : true 배경 투명으로
    renderer.setSize(WIDTH, HEIGHT);
    // renderer.shadowMap.enabled = true;

    document.querySelector("#canvasWrap").appendChild(renderer.domElement);

    {
        //조명 넣기
        var light = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
        light.position.set(100, 100, 100);
        scene.add(light);
    }
    {
        //조명
        const color = 0xffffff;
        const intensity = 2;
        const light = new THREE.PointLight(color, intensity);
        light.position.set(140, 160, 150);
        scene.add(light);
    }

    fbxLoadFunc("./model/can.FBX");
};

const fbxLoadFunc = (modelName) => {
    const fbxLoader = new FBXLoader();
    fbxLoader.load(
        modelName,
        (object) => {
            console.log(object);
            //크기 조절
            let scaleNum = 1;
            object.scale.set(scaleNum, scaleNum, scaleNum);

            model.add(object.children[0]);
            model.rotation.set(0.4, 9.3, 0);

            modelBody.position.set(0, 10, 0);
            modelBody.add(model);
            scene.add(modelBody);

            // const modelBody2 = modelBody.clone();
            // scene.add(modelBody2);
            // modelBody2.position.set(0, 50, -40);

            // const modelBody3 = modelBody.clone();
            // scene.add(modelBody3);
            // modelBody3.position.set(20, -20, -20);

            // const modelBody4 = modelBody.clone();
            // scene.add(modelBody4);
            // modelBody4.position.set(-20, -20, 20);

            // const modelBody5 = modelBody.clone();
            // scene.add(modelBody5);
            // modelBody5.position.set(-20, -20, 20);

            // const modelBody6 = modelBody.clone();
            // scene.add(modelBody6);
            // modelBody6.position.set(-20, -20, 20);

            gsap.from("h1", {
                duration: 0.8,
                delay: 0.35,
                y: 60,
                alpha: 0,
                ease: "Power2.easeInOut",
            });
            gsap.from(model.position, {
                duration: 1.8,
                delay: 0.5,
                x: 0,
                // y: -50,
                z: -100,
                ease: "Power2.easeInOut",
            });
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
            console.log(error);
        }
    );
};

let moveNum = 0;
let scrollTop = 0;

const animate = () => {
    moveNum += (scrollTop / 500 - moveNum) * 0.1;
    // console.log(moveNum);

    model.rotation.y += 0.01;
    modelBody.rotation.y = moveNum;
    modelBody.rotation.z = moveNum / 12;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

init();
animate();

const scrollFunc = () => {
    scrollTop = window.scrollY; //현재 스크롤 위치
    // console.log(scrollTop);
};

window.addEventListener("scroll", scrollFunc);
