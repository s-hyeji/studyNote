import * as THREE from "three";

export default function printStone() {
  const Stone = new THREE.Group();
  // 텍스처
  const textureLoader = new THREE.TextureLoader();
  const stoneBase = textureLoader.load('./images/stone_basecolor.jpg')
  const stoneNormal = textureLoader.load('./images/stone_normal.jpg')
  const stoneRoughness = textureLoader.load('./images/stone_roughness.jpg')

  const stoneMaterial = new THREE.MeshStandardMaterial({
    color: 0x565656,
    map: stoneBase,
    normalMap: stoneNormal,
    roughnessMap: stoneRoughness,
    roughness: 0.8,
  });

  // 몸통
  const bodyGeometry = new THREE.CylinderGeometry(0.9, 1.5, 4, 4);
  bodyGeometry.computeVertexNormals();
  bodyGeometry.attributes.uv.needsUpdate = true;
  const body = new THREE.Mesh(bodyGeometry, stoneMaterial);
  body.rotation.y = Math.PI / 4;
  Stone.add(body);

  // 모자
  const hatGeometry = new THREE.BoxGeometry(2, 0.2, 2);
  const hat = new THREE.Mesh(hatGeometry, stoneMaterial);
  hat.position.y = 1.5;
  Stone.add(hat);

  // 팔
  const armGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1.6, 6);
  const armLeft = new THREE.Mesh(armGeometry, stoneMaterial);
  armLeft.position.set(-1.3, -0.1, 0);
  armLeft.rotation.z = Math.PI / 3;
  const armRight = new THREE.Mesh(armGeometry, stoneMaterial);
  armRight.position.set(1.3, -0.1, 0);
  armRight.rotation.z = Math.PI / -3;
  Stone.add(armLeft, armRight);

  // 눈
  const eyeGeometry = new THREE.CapsuleGeometry(0.3, 0.2);
  const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })
  const eyeLeft = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eyeLeft.position.set(-0.23, 0.7, 0.63);
  const eyeRight = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eyeRight.position.set(0.23, 0.7, 0.63);
  Stone.add(eyeLeft, eyeRight);

  // 눈동자
  const pupilGeometry = new THREE.SphereGeometry(0.1);
  const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 })
  const pupilLeft = new THREE.Mesh(pupilGeometry, pupilMaterial);
  pupilLeft.position.set(-0.2, 0.75, 0.89);
  const pupilRight = new THREE.Mesh(pupilGeometry, pupilMaterial);
  pupilRight.position.set(0.25, 0.75, 0.89);
  Stone.add(pupilLeft, pupilRight);

  // 코
  const noseGeometry = new THREE.CylinderGeometry(0.1, 0.2, 0.4, 6);
  const nose = new THREE.Mesh(noseGeometry, stoneMaterial);
  nose.position.set(0, 0.47, 0.89);
  Stone.add(nose);

  for (const mesh of Stone.children) {
    mesh.castShadow = true;
  }

  Stone.position.y = 1;
  return Stone;
}