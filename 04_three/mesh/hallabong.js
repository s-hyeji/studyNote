import * as THREE from "three";


export default function printHallabong() {
 // 한라봉
 const loader = new THREE.TextureLoader();
 const baseColor = loader.load('./images/orange_CoLoR.jpg');
 const normal = loader.load('./images/orange_NoRM.jpg');
 const rough = loader.load('./images/orange_RoUGH.jpg');
 baseColor.colorSpace = THREE.SRGBColorSpace;
 rough.colorSpace = THREE.SRGBColorSpace;

 const hallabong = new THREE.Group();
 const hallabongMaterial = new THREE.MeshStandardMaterial({
  color: 0xffb48c,
  map: baseColor,
  normalMap: normal,
  roughness: 0.2,
  noughnessMap: rough
  // wireframe: true,
 });
 const bottomGeometry = new THREE.DodecahedronGeometry(2, 1);
 const bottom = new THREE.Mesh(bottomGeometry, hallabongMaterial);
 const topGeometry = new THREE.TetrahedronGeometry(0.8, 3);
 const top = new THREE.Mesh(topGeometry, hallabongMaterial);
 top.position.y = 1.7;
 // 잎
 const hallabongleafMaterial = new THREE.MeshStandardMaterial({
  color: 0x008000,
  side: THREE.DoubleSide
 });
 const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4);
 const stem = new THREE.Mesh(stemGeometry, hallabongleafMaterial);
 stem.position.y = 2.5;

 const hallabongleafGeometry = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI / 3)
 const hallabongleaf = new THREE.Mesh(hallabongleafGeometry, hallabongleafMaterial);
 hallabongleaf.position.set(-0.5, 2.4, -0.1);
 hallabongleaf.rotation.z = Math.PI / -2;
 hallabong.add(bottom, top, stem, hallabongleaf);




 return hallabong;
};