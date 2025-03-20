import * as THREE from 'three';
import { OrbitControls } from "OrbitControls";

// 씬, 카메라, 렌더러 생성
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// 톤 맵핑 비활성화, 출력 인코딩 선형 색상 공간으로 설정
renderer.toneMapping = THREE.NoToneMapping;
renderer.outputEncoding = THREE.LinearEncoding;  // 선형 색상 공간
renderer.gammaInput = false; // 감마 입력 비활성화
renderer.gammaOutput = false; // 감마 출력 비활성화
document.body.appendChild(renderer.domElement);
scene.environment = null;

// 360도 이미지 로드
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./images/small_cathedral_02_4k.png');
// texture.encoding = THREE.sRGBEncoding;
texture.encoding = THREE.LinearEncoding;
const geometry = new THREE.SphereGeometry(500, 60, 40);
geometry.scale(-1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// 카메라 위치 조정
camera.position.set(0, 0, 0.1);

// OrbitControls 추가 (마우스 조작)
const controls = new OrbitControls(camera, renderer.domElement);
controls.rotateSpeed = -0.5;
// controls.panSpeed = 0.5;
controls.screenSpacePanning = false;
controls.enableDamping = true;
controls.enableZoom = true;
controls.zoomSpeed = 10;
controls.minDistance = 10;  // 최소 줌 거리
controls.maxDistance = 300; // 최대 줌 거리
// 애니메이션 루프
function animate() {
 requestAnimationFrame(animate);
 controls.update();
 renderer.render(scene, camera);
}
animate();

// 창 크기 조절 대응
window.addEventListener('resize', () => {
 camera.aspect = window.innerWidth / window.innerHeight;
 camera.updateProjectionMatrix();
 renderer.setSize(window.innerWidth, window.innerHeight);
});