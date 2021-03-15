import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { WhiteboardContext } from '../WhiteboardContext';
import { toolsSection } from '../../../components/toolbar/toolbar-sections';
import './styles.css';
import IBasicToolbarSelector from '../../../interfaces/toolbar/toolbar-selector/basic-toolbar-selector';
import { BufferGeometry } from 'three';

type ICanvas3dProps = {
  width: number;
  height: number;
};


class Canvas3d extends React.Component<ICanvas3dProps> {
  static contextType = WhiteboardContext;

  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  geometry?: THREE.BufferGeometry
  shape?: THREE.Mesh | THREE.LineSegments;
  dataURL: string = '';
  renderRequested: boolean | undefined = false;
  canvas?: Element | null;
  controls?: OrbitControls
  canvasStyle?: {left: number, top: number}
  canvasSize?: {width: number, height: number}

  constructor(props: ICanvas3dProps) {
    super(props);
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.camera = new THREE.PerspectiveCamera();
  }

  init = () => {
    this.initRenderer();
    this.initCamera();
    this.initLights();
    this.initControls();
    if (this.context.json3D !== '') {
      console.log('recovering...');
      this.recoverScene();
      
    } else {
      this.shape = this.shapeCreation();
      this.scene.add(this.shape);
      
      
      // this.initControls();
    }
    this.rendererRender();
    // window.addEventListener('resize', this.requestRenderIfNotRequested);
  };

  recoverScene = () => {
    const loader = new THREE.ObjectLoader();
    let jsonObj = JSON.parse(this.context.json3D);
    this.scene = loader.parse(jsonObj.scene);
    const cameraPos = jsonObj.cameraPosition
    this.camera.position.set( cameraPos.x, cameraPos.y, cameraPos.z );
    this.controls?.update();
    this.context.update3dShape(jsonObj.shape)
    this.shape = this.shapeCreation()
    this.scene.clear()
    this.scene.add(this.shape);
    this.canvasStyle = jsonObj.canvasStyle
    this.canvasSize = {width: jsonObj.canvasSize.width, height: jsonObj.canvasSize.height}
    this.renderer.setSize(this.canvasSize.width, this.canvasSize.height)
    this.rendererRender();
    // const geometryLoader = new THREE.BufferGeometryLoader();
    // console.log(jsonObj.geometry)
    // this.geometry = geometryLoader.parse(jsonObj.geometry)
    // console.log(this.geometry)
    // // \\\this.geometryToEdges()
    // this.context.update3dShape("")
    // this.context.set3dJson("")
  };

  requestRenderIfNotRequested = () => {
    if (!this.renderRequested) {
      this.renderRequested = true;
      requestAnimationFrame(this.rendererRender);
    }
  };

  initControls = () => {
    this.controls = new OrbitControls(this.camera, this.canvas as HTMLElement);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 0, 0);
    this.controls.enableZoom = false;
    this.controls.update();
    this.controls.addEventListener('change', this.requestRenderIfNotRequested);
  };

  initLights = () => {
    this.addLight(-1, 2, 4);
    this.addLight(1, -1, -2);
  };

  initCamera = () => {
    const fov = 40;
    const aspect = this.props.width / this.props.height; //2; // the canvas default
    const near = 0.1;
    const far = 125; //25;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = 90;
  };

  initRenderer = () => {
    this.renderer = new THREE.WebGLRenderer();
    this.scene.clear();
    this.canvas = document.querySelector('#three');
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas as HTMLCanvasElement,
      alpha: true,
      antialias: true,
    });
    this.renderer.setClearColor(0xffffff, 0);
    const width = this.props.width / 3
    const height = this.props.height / 3
    this.renderer.setSize(width, height);
    this.canvasSize = {width, height}
    this.renderer.setPixelRatio(window.devicePixelRatio);
  };

  shapeCreation = () => {
    
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
        this.geometry = new THREE.BoxGeometry(
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
        this.geometry = new THREE.ConeGeometry(radius, height, radialSegments);
        break;

      case 'squareBasedPyramid':
        radius = 20;
        height = 46;
        radialSegments = 4;
        this.geometry = new THREE.ConeGeometry(radius, height, radialSegments);
        break;

      case 'cylinder':
        radiusTop = 20;
        radiusBottom = 20;
        height = 46;
        radialSegments = 24;

        this.geometry = new THREE.CylinderGeometry(
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

        this.geometry = new THREE.CylinderGeometry(
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
        this.geometry = new THREE.SphereGeometry(
          radius,
          widthSegments,
          heightSegments
        );
        break;

      case 'pyramid':
        radius = 30;
        this.geometry = new THREE.TetrahedronGeometry(radius);
        break;
      case 'torus':
        radius = 22;
        const tubeRadius = 8;
        radialSegments = 6;
        const tubularSegments = 10;
        this.geometry = new THREE.TorusGeometry(
          radius,
          tubeRadius,
          radialSegments,
          tubularSegments
        );
        break;
      case 'rectangularPrism':
        radius = 30;
        this.geometry = new THREE.TetrahedronGeometry(radius);
        break;
      default:
        size = 32; //32
        widthSegments = 1;
        heightSegments = 1;
        depthSegments = 1;
        this.geometry = new THREE.BoxGeometry(
          size,
          size,
          size,
          widthSegments,
          heightSegments,
          depthSegments
        );
        break;
    }

    const edgeGeometry = this.generateEdges()

    const shape = this.makeInstance(edgeGeometry, 0, 0, 0, false);
    return shape;
    // this.scene.add(this.shape);
  };

  generateEdges = () => {
    const geometry = this.geometry ?? new BufferGeometry()
    const thresholdAngle = 15;
    return new THREE.EdgesGeometry(geometry, thresholdAngle);
  }

  geometryToEdges = () => {
    // const rotateX = this.shape?.rotateX
    // const rotateY = this.shape?.rotateY
    this.scene.clear()
    const edgeGeometry = this.generateEdges()
    this.shape = this.makeInstance(edgeGeometry, 0, 0, 0, false);
    this.scene.add(this.shape)
    this.rendererRender()
  }

  edgesToGeometry = () => {
    // const rotateX = this.shape?.rotateX
    // const rotateY = this.shape?.rotateY
    this.scene.clear()
    this.shape = this.makeInstance(this.geometry, 0, 0, 0, false);
    this.scene.add(this.shape)
    // this.rendererRender()
  }

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
    dashed: boolean,
    color: string | number | undefined | THREE.Color = 0x2194ce
  ) {
    // const material = new THREE.MeshPhongMaterial({
    //   color: 0x000000,
    //   opacity: 0.1,
    //   transparent: true,
    // });
    // const mesh = new THREE.Mesh(geometry, material);

    // const material = new THREE.LineBasicMaterial({
    //   color: 0x494949,
    // });
    // const mesh = new THREE.LineSegments(geometry, material);
    // mesh.rotateY(22.5);
    // this.scene.add(mesh);

    let material: THREE.LineBasicMaterial;
    if (dashed) {
      material = new THREE.LineDashedMaterial({
        color: 0x494949,
        linewidth: 1,
        scale: 1,
        dashSize: 3,
        gapSize: 1,
        depthTest: dashed,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
    } else {
      material = new THREE.LineBasicMaterial({
        color: 0x494949,
        linewidth: 1,
        depthTest: dashed,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
    }
    const shape = new THREE.LineSegments(geometry, material);
    if (dashed) shape.computeLineDistances();
    shape.rotateY(22.5);

    shape.position.x = x;
    shape.position.set(x, y, z);

    return shape;
  }



  addLight = (x: number, y: number, z: number) => {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    this.scene.add(light);
  };

  isNewShape = () => {
    const shapesElements = toolsSection.elements.filter(
      (element) => element.id === 'add_3d_shape'
    );
    const shapesElement: IBasicToolbarSelector = shapesElements[0] as IBasicToolbarSelector;
    const exists = shapesElement.options.find(
      (option) => option.value === this.context.shape3d
    );
    if (typeof exists === 'undefined') return false;
    return true;
  };

  // componentDidMount() {
  //   this.isNewShape()
  //   //this.init();
  // }

  export = () => {
    if (this.dataURL === '') return
    console.log("saving...")
    this.context.update3dShape("")
    // console.log(this.shape?.toJSON())
    this.context.set3dImage(this.dataURL);
    this.edgesToGeometry()
    const jsonObj = {scene: this.scene.toJSON(), canvasStyle: this.canvasStyle, canvasSize: this.canvasSize, shape: this.context.shape3d, geometry: this.geometry?.toJSON(), rendererSize: {width: 0, height: 0 }, rendererPosition: {top:0, left:0}, cameraPosition: {x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z}}
    console.log(this.camera.position.x, this.camera.position.y, this.camera.position.z)
    console.log(jsonObj)
    this.context.set3dJson(JSON.stringify(jsonObj));
    this.dataURL = '';
    this.context.setResizing3d(false)
  }

  componentDidUpdate() {
    if (!this.context.is3dActive) {
      this.export()
    } else {
      if (this.context.shape3d !== '' || this.context.json3D !== ''){
        this.init();
       
        // if(this.context.resizing3d)
        //   this.export()
        
      }
    }
  }

  renderScene = () => {
    return (
      this.context.is3dActive &&
      (this.context.shape3d !== '' || this.context.json3D !== '') && (
        <canvas style={(this.canvasStyle) ?? {} }  
         id="three"></canvas>
      )
    );
    // this.context.is3dActive && <div id="three" ref={(ref) => (this.mount = ref)}></div>
  };

  render() {
    return this.renderScene();
  }
}
export default Canvas3d;
