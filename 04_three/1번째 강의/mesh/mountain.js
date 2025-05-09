import * as THREE from "three";

export default function printMountain() {
 const loader = new THREE.TextureLoader();
 const top = loader.load('./images/mountain_top.jpg');
 const side = loader.load('./images/mountain.jpg');

 const geometry = new THREE.CylinderGeometry(1, 3, 3, 8);
 const materials = [
  new THREE.MeshStandardMaterial({
   map: side
  }),
  new THREE.MeshStandardMaterial({ map: top }),
  new THREE.MeshStandardMaterial({ color: 0x609966 }),
 ]

 const mountain = new THREE.Mesh(geometry, materials);
 mountain.castShadow = true
 mountain.receiveShadow = true

 return mountain;
};