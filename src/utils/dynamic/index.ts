import * as THREE from "three";
import { createCylinder, width, height, reRender } from "./core";

interface MeshConfig {
  position: THREE.Vector3;
  rotation: THREE.Euler;
}
interface RendererConfig {
  width: number;
  height: number;
  position: string;
  clearColor: number;
  canvasContainer: string;
}

export const _initializeScene = (
  mesh: {
    geometry: THREE.BufferGeometry;
    mesh: THREE.Mesh;
    config: MeshConfig;
  }[],
  rendererConfig: RendererConfig,
) => {
  // 创建场景
  const scene = new THREE.Scene();
  // 遍历并添加网格到场景 geometry
  mesh.forEach(({ mesh, config }) => {
    mesh.position.copy(config.position);
    mesh.rotation.copy(config.rotation);
    scene.add(mesh);
  });

  // 创建光源 #211040 0xffffff
  const point = new THREE.PointLight(0xffffff, 6); //创建一个点光源: 参数1 光的颜色，参数2 光的强度
  point.position.set(1, 2, 2); //设置点光源的位置
  scene.add(point); //向场景中添加点光源

  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    30,
    rendererConfig.width / rendererConfig.height,
    1,
    3000,
  );
  camera.position.set(4, 3, 4);
  camera.lookAt(0, 0, 0);
  scene.add(camera);

  // 创建渲染器
//   const renderer = new THREE.WebGL1Renderer();
  const renderer = new THREE.WebGLRenderer()
  renderer.setClearColor(rendererConfig.clearColor, 0);
  renderer.setSize(rendererConfig.width, rendererConfig.height);

//   const webglNode = document.getElementById(rendererConfig.canvasContainer);
  const webglNode = document.querySelector(rendererConfig.canvasContainer);
  if (webglNode) {
    webglNode.appendChild(renderer.domElement);
  }

  // 返回渲染函数

  return () => {
    const render = () => {
      mesh.forEach(({ mesh }) => {
        const updatedMesh = mesh.clone();
        updatedMesh.rotation.x += 0.002;
        updatedMesh.rotation.y += 0.002;
        renderer.render(scene, camera);
      });
      requestAnimationFrame(render);
    };
    render();
  };
};

export const initializeScene = () => {
  // 创建场景
  const scene = new THREE.Scene();

  // 创建模型 一
  const { mesh, geometry } = createCylinder();
  mesh.position.set(-4, 0.1, 0);
  scene.add(mesh);
  geometry.rotateX(Math.PI / 1.4);
  geometry.rotateY(Math.PI / 2.6);

  //第二次创建模型
  const { mesh: mesh1, geometry: geometry1 } = createCylinder();
  mesh1.position.set(0, -1, -5);
  scene.add(mesh1);
  geometry1.rotateX(2);
  geometry1.rotateY(Math.PI / 6);
  geometry1.rotateZ(Math.PI / 1);

  //   第三次创建模型
  const { mesh: mesh2, geometry: geometry2 } = createCylinder();
  mesh2.position.set(-0.2, 0, 2);
  scene.add(mesh2);
  geometry2.rotateX(2);
  geometry2.rotateY(1);
  geometry2.rotateZ(5);

  // 辅助观察的坐标系 红R、绿G、蓝B分别对应坐标系的x、y、z轴，对于three.js的3D坐标系默认y轴朝上
  //   const axesHelper = new THREE.AxesHelper(150);
  //   scene.add(axesHelper);

  // 创建灯光
  const point = new THREE.PointLight(0xffffff, 6); //创建一个点光源: 参数1 光的颜色，参数2 光的强度
  point.position.set(1, 2, 2);
  scene.add(point);

  // 创建相机
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
  camera.position.set(4, 3, 7); // 设置相机位置
  camera.lookAt(0, 0, 0); // 设置镜头方向
  scene.add(camera);

  //   创建渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xb9d3ff, 0);
  renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
  renderer.render(scene, camera); //执行渲染操作
  // 执行渲染命令会输出一个canvas画布，也就是一个HTML元素，你可以插入到web页面中
  const webglNode = document.querySelector(".container-Box");
  if (webglNode) {
    // webglNode.style.backgroundColor = "";
    webglNode.appendChild(renderer.domElement);
  }

  // 动画封装
  reRender({ scene, camera, mesh, geometry, renderer, rotationSpeed: 0.003 });
  reRender({
    scene,
    camera,
    mesh: mesh1,
    geometry: geometry1,
    renderer,
    rotationSpeed: 0.003,
  });
  reRender({
    scene,
    camera,
    mesh: mesh2,
    geometry: geometry2,
    renderer,
    rotationSpeed: 0.003,
  });
};

export const cleanScene = () => {
  const container = document.querySelector(".container-Box");
  if (container) container.innerHTML = "";
};
