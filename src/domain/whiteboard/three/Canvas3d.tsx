import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { WhiteboardContext } from '../WhiteboardContext';
import './styles.css';

type ICanvas3dProps = {
  // set3dImage: (image: string) => void;
  width: number;
  height: number;
};

class Canvas3d extends React.Component<ICanvas3dProps> {
  static contextType = WhiteboardContext;

  // mount: HTMLDivElement | null | undefined;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  mesh: THREE.Mesh;
  dataURL: string = '';
  renderRequested: boolean | undefined = false;

  constructor(props: ICanvas3dProps) {
    super(props);
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.camera = new THREE.PerspectiveCamera();
    this.mesh = new THREE.Mesh();
  }

  init = () => {
    this.scene.clear();
    const canvas = document.querySelector('#three');
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas as HTMLCanvasElement,
      alpha: true,
      antialias: true,
    });
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.setSize(this.props.width / 3, this.props.height / 3);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    const fov = 40;
    const aspect = this.props.width / this.props.height; //2; // the canvas default
    const near = 0.1;
    const far = 125; //25;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = 90;

    const controls = new OrbitControls(this.camera, canvas as HTMLElement);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    controls.enableZoom = false;
    controls.update();

    this.addLight(-1, 2, 4);
    this.addLight(1, -1, -2);

    let geometry: THREE.BufferGeometry;
    let thresholdAngle = 15;
    let size = 32; //16
    let widthSegments = 1;
    let heightSegments = 1;
    let depthSegments = 1;

    let height = 25;
    let radialSegments = 50;
    let radius = 20;
    let radiusTop = 20;
    let radiusBottom = 20;

    switch (this.context.shape3d) {
      case 'rectangularPrism':
        const width = 50;
        const depth = 25;
        widthSegments = 1;
        heightSegments = 1;
        depthSegments = 1;
        geometry = new THREE.BoxGeometry(
          width,
          height,
          depth,
          widthSegments,
          heightSegments,
          depthSegments
        );
        break;

      case 'cone':
        radius = 20;
        height = 46;
        radialSegments = 12;
        geometry = new THREE.ConeGeometry(radius, height, radialSegments);
        break;

      case 'squareBasedPyramid':
        radius = 20;
        height = 46;
        radialSegments = 4;
        geometry = new THREE.ConeGeometry(radius, height, radialSegments);
        break;

      case 'cylinder':
        radiusTop = 20;
        radiusBottom = 20;
        height = 46;
        radialSegments = 24;

        geometry = new THREE.CylinderGeometry(
          radiusTop,
          radiusBottom,
          height,
          radialSegments
        );
        break;

        case 'triangularPrism':
          radiusTop = 20;
          radiusBottom = 20;
          height = 46;
          radialSegments = 3;
  
          geometry = new THREE.CylinderGeometry(
            radiusTop,
            radiusBottom,
            height,
            radialSegments
          );
          break;

      case 'sphere':
        radius = 30;
        widthSegments = 12;
        heightSegments = 11;
        geometry = new THREE.SphereGeometry(
          radius,
          widthSegments,
          heightSegments
        );
        break;

      case 'pyramid':
        radius = 30;
        geometry = new THREE.TetrahedronGeometry(radius);
        break;
      case 'torus':
        radius = 22;
        const tubeRadius = 8;
        radialSegments = 8;
        const tubularSegments = 16;
        geometry = new THREE.TorusGeometry(
          radius,
          tubeRadius,
          radialSegments,
          tubularSegments
        );
        break;
      case 'rectangularPrism':
        radius = 30;
        geometry = new THREE.TetrahedronGeometry(radius);
        break;
      default:
        size = 32; //16
        widthSegments = 1;
        heightSegments = 1;
        depthSegments = 1;
        geometry = new THREE.BoxGeometry(
          size,
          size,
          size,
          widthSegments,
          heightSegments,
          depthSegments
        );
        break;
    }

    const edgeGeometry = new THREE.EdgesGeometry(geometry, thresholdAngle);

    this.makeInstance(edgeGeometry, 0, 0, 0);

    this.rendererRender();

    const requestRenderIfNotRequested = () => {
      if (!this.renderRequested) {
        this.renderRequested = true;
        requestAnimationFrame(this.rendererRender);
      }
    };

    controls.addEventListener('change', requestRenderIfNotRequested);
    window.addEventListener('resize', requestRenderIfNotRequested);
  };

  resizeRendererToDisplaySize = () => {
    const canvas = this.renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      this.renderer.setSize(width, height, false);
    }
    return needResize;
  };

  rendererRender = () => {
    this.renderRequested = undefined;

    // if (this.resizeRendererToDisplaySize()) {
    //   const canvas = this.renderer.domElement;
    //   this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    //   this.camera.updateProjectionMatrix();
    // }

    this.renderer.render(this.scene, this.camera);
    this.dataURL = this.renderer.domElement.toDataURL();
  };

  hsl(h: number, s: number, l: number) {
    return new THREE.Color().setHSL(h, s, l);
  }

  makeInstance(
    geometry: any,
    x: number,
    y: number,
    z: number,
    color: string | number | undefined | THREE.Color = 0x2194ce
  ) {
    const material = new THREE.LineBasicMaterial({
      color: 0x494949,
    });
    const mesh = new THREE.LineSegments(geometry, material);
    // mesh.rotateX(22.5)
    mesh.rotateY(22.5);

    // const material = new THREE.MeshPhongMaterial({
    //   color: 0x000000,
    //   opacity: 0.1,
    //   transparent: true,
    // });
    // const mesh = new THREE.Mesh(geometry, material);

    this.scene.add(mesh);

    mesh.position.x = x;
    mesh.position.set(x, y, z);

    return mesh;
  }
  addLight = (x: number, y: number, z: number) => {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    this.scene.add(light);
  };

  // componentDidMount() {
  //   this.init();
  // }

  componentDidUpdate() {
    console.log(this.context.is3dActive);
    if (!this.context.is3dActive) {
      if (this.dataURL !== '') {
        this.context.set3dImage(this.dataURL);
        this.dataURL = '';
      }
    } else {
      if (this.context.shape3d !== '') this.init();
    }
  }

  renderScene = () => {
    return (
      this.context.is3dActive &&
      this.context.shape3d !== '' && <canvas id="three"></canvas>
    );
    // this.context.is3dActive && <div id="three" ref={(ref) => (this.mount = ref)}></div>
  };

  render() {
    return this.renderScene();
  }
}
export default Canvas3d;
