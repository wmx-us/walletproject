import * as THREE from "three";
import bgImg from "@/assets/images/bgCake.png";

export const width: number = 1200; //宽度
export const height: number = 520; // 高度

interface CreateCylinderResult {
  geometry: THREE.CylinderGeometry;
  mesh: THREE.Mesh;
}
interface ReRenderParams {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  mesh: THREE.Mesh;
  renderer: THREE.WebGLRenderer;
  geometry: THREE.CylinderGeometry;
  rotation?: number;
  rotationSpeed?: number;
  duration?: number;
}

export const createCylinder = (): CreateCylinderResult => {
  // 创建几何物体 参数（xyz）为物体长宽高坐标
  const geometry = new THREE.CylinderGeometry(1, 1, 0.2);

  const loader = new THREE.CubeTextureLoader();

  const textureCube = loader.load([bgImg, bgImg, bgImg, bgImg, bgImg, bgImg]);

  // 创建材质

  const material = new THREE.MeshStandardMaterial({
    metalness: 1, //金属度属性
    roughness: 0, //表面粗糙度
    envMap: textureCube,
    envMapIntensity: 1.0,
  });

  const mesh = new THREE.Mesh(geometry, material);

  return { geometry, mesh };
};

export const reRender = ({
  scene,
  camera,
  mesh: initialMesh,
  renderer,
  geometry,
  rotationSpeed = 0.001,
}: ReRenderParams): void => {
  const mesh = initialMesh.clone() as THREE.Mesh;

  const handel = (): void => {
    mesh.rotation.x += rotationSpeed;
    geometry.rotateY(rotationSpeed);
    renderer.render(scene, camera);
    requestAnimationFrame(handel);
  };
  handel();
};
