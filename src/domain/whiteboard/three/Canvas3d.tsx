import React from 'react';
import * as THREE from 'three';
import { WhiteboardContext } from '../WhiteboardContext';
import './styles.css';

type ICanvas3dProps = {
  // set3dImage: (image: string) => void;
  width: number,
  height: number
};
// type Canvas3dState = {
//   image: string;
// };

class Canvas3d extends React.Component<ICanvas3dProps> {
  static contextType = WhiteboardContext;

  mount: HTMLDivElement | null | undefined;

  // state: Canvas3dState = {
  //   image: '',
  // };

  init = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0xffffff, 0);
    renderer.setSize(this.props.width, this.props.height);
    this.mount?.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const material = new THREE.MeshPhongMaterial({
      color: 0x2194ce,
      specular: 0x003344,
      shininess: 100,
      side: THREE.FrontSide,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const light = new THREE.PointLight(new THREE.Color('#ffffff'));
    light.position.set(0, 50, 0);
    scene.add(light);

    // const material2 = new THREE.MeshPhongMaterial({
    // color:0xFF0000,
    // wireframe:true
    // });
    // const mesh2 = new THREE.Mesh(geometry.clone(), material2);
    // scene.add(mesh2);

    camera.position.z = 2;

    // cube.rotation.x += 45;
    // cube.rotation.y += 45;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
      const dataURL = renderer.domElement.toDataURL();
      // console.log(dataURL)
      //   this.props.set3dImage(dataURL);
    };

    animate();
    renderer.render(scene, camera);
  }

  componentDidUpdate() {
    if(this.context.is3dModalOpen)
      this.init()
  }

  render() {
    return <div id="three" ref={(ref) => (this.mount = ref)} />
  }
}
export default Canvas3d;
