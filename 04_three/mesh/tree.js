import * as THREE from "three";

export default function printTree() {
 // 나무
 const loader = new THREE.TextureLoader();
 const baseColor = loader.load('./images/wood_basecolor.jpg');
 const normal = loader.load('./images/wood_normal.jpg');
 const rough = loader.load('./images/wood_roughness.jpg');
 const height = loader.load('./images/wood_height.png');
 const leafTexture = loader.load('./images/leaf_texture.png');

 baseColor.colorSpace = THREE.SRGBColorSpace;
 rough.colorSpace = THREE.SRGBColorSpace;

 const trunk = new THREE.Group();
 const trunkMaterial = new THREE.MeshStandardMaterial({
  color: 0xa38049,
  map: baseColor,
  normalMap: normal,
  noughnessMap: rough,
 });
 const trunkGeometry = new THREE.CylinderGeometry(0.8, 1, 1.5);
 const trunk1 = new THREE.Mesh(trunkGeometry, trunkMaterial);
 const trunk2 = new THREE.Mesh(trunkGeometry, trunkMaterial);
 const trunk3 = new THREE.Mesh(trunkGeometry, trunkMaterial);
 const trunk4 = new THREE.Mesh(trunkGeometry, trunkMaterial);
 trunk.add(trunk1, trunk2, trunk3, trunk4);
 trunk2.position.set(0.1, 1.3, 0);
 trunk3.position.set(0.2, 2.5, 0);
 trunk4.position.set(0.3, 3.5, 0);
 trunk2.scale.set(0.9, 0.9, 0.9);
 trunk3.scale.set(0.8, 0.8, 0.8);
 trunk4.scale.set(0.8, 0.8, 0.8);
 trunk2.rotation.z = THREE.MathUtils.degToRad(-5);
 trunk3.rotation.z = THREE.MathUtils.degToRad(-5);
 trunk4.rotation.z = THREE.MathUtils.degToRad(-8);


 const leaf = new THREE.Group();
 const leafMaterial = new THREE.MeshStandardMaterial({
  color: 0x84ad88,
  side: THREE.DoubleSide,
  map: leafTexture,
  transparent: true
 });
 const leafGeometry = new THREE.SphereGeometry(2, 32, 16, Math.PI / 3, Math.PI / 3)
 const leaf1 = new THREE.Mesh(leafGeometry, leafMaterial)
 const leaf2 = new THREE.Mesh(leafGeometry, leafMaterial)
 const leaf3 = new THREE.Mesh(leafGeometry, leafMaterial)
 const leaf4 = new THREE.Mesh(leafGeometry, leafMaterial)
 leaf.add(leaf1, leaf2, leaf3, leaf4);
 leaf1.position.set(0, 3.2, 2)
 leaf1.rotation.x = Math.PI / -2;
 leaf2.position.set(2, 3.2, 0)
 leaf2.rotation.x = Math.PI / -2;
 leaf2.rotation.z = Math.PI / 2;
 leaf3.position.set(0, 3.2, -2)
 leaf3.rotation.x = Math.PI / -2;
 leaf3.rotation.z = Math.PI;
 leaf4.position.set(-2, 3.2, 0)
 leaf4.rotation.x = Math.PI / -2;
 leaf4.rotation.z = Math.PI / -2;

 // 그룹
 const tree = new THREE.Group();
 tree.add(trunk, leaf)
 leaf.position.x = -0.4;
 leaf.rotation.z = THREE.MathUtils.degToRad(-10);

 return tree;
};