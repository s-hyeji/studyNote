import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { DragControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/DragControls.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

const totalNum = 10; //전체 박스 갯수

let scene, camera, renderer, controls;
let cardArray = [];

const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000"); //배경 컬러
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
    camera.position.set(0, 0, 50);

    gsap.from(camera.position, {
        duration: 1,
        delay: 0.8,
        z: 150,
        ease: "Power2.easeInOut",
    });

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

    // controls = new OrbitControls(camera, renderer.domElement);

    {
        //바닥
        // const imageMap = new THREE.TextureLoader().load("./image/hardwood.jpg");
        // imageMap.wrapS = THREE.RepeatWrapping;
        // imageMap.wrapT = THREE.RepeatWrapping;
        // imageMap.repeat.set(10, 10);

        const geometry = new THREE.BoxGeometry(400, 400, 2);
        const material = new THREE.MeshPhongMaterial({
            // map: imageMap,
            color: 0x464946,
        });
        const wallMesh = new THREE.Mesh(geometry, material);

        wallMesh.position.set(0, 0, -1);
        wallMesh.receiveShadow = true; //default is false
        // wallMesh.castShadow = true;
        scene.add(wallMesh);
    }
    for (let i = 0; i <= totalNum; i++) {
        addBox(i);
        // console.log(i);
    }
    addLight(15, 15, 20);

    const controls = new DragControls(cardArray, camera, renderer.domElement);
};

//카드 추가
const addBox = (i) => {
    const imageMap = new THREE.TextureLoader();
    imageMap.load("https://source.unsplash.com/collection/" + i, (data) => {
        const geometry = new THREE.BoxGeometry(16, 12, 1);
        const material = new THREE.MeshPhongMaterial({
            map: data,
            // color: 0xffffff,
        });
        const cardMesh = new THREE.Mesh(geometry, material);
        cardMesh.castShadow = true;
        // cardMesh.receiveShadow = true;

        let x = 0; //Math.random() * 50 - 25;
        let y = 0; //Math.random() * 50 - 25;
        let z = 0;
        cardMesh.position.set(x, y, z);
        // cardMesh.rotation.set(0, 0, Math.random() * 360);

        gsap.to(cardMesh.position, {
            duration: 0.8,
            delay: i * 0.1 + 0.5,
            x: Math.random() * 80 - 40,
            y: Math.random() * 80 - 40,
            ease: "Power4.easeOut",
        });
        gsap.to(cardMesh.rotation, {
            duration: 0.8,
            delay: i * 0.1 + 0.5,
            z: Math.random() * 2 - 1,
            ease: "Power4.easeOut",
        });
        // https://greensock.com/docs/v2/Easing

        cardArray.push(cardMesh);
        //drag를 위한 배열
        scene.add(cardMesh);
    });
};

//조명 넣기
const addLight = (...pos) => {
    const color = 0xffffff;
    const intensity = 0.4;
    const light = new THREE.PointLight(color, intensity);
    light.castShadow = true;

    // addLight(15, 15, 20);
    // ...pos로 위치값을 바로 가져옵니다.
    light.position.set(...pos);

    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default
    light.shadow.radius = 5;
    light.shadow.blurSamples = 5;
    scene.add(light);

    // const helper = new THREE.PointLightHelper(light);
    // scene.add(helper);
};

const animate = () => {
    //controls.update();
    // camera.lookAt(scene.position);
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

init();
animate();
window.addEventListener("resize", stageResize);
