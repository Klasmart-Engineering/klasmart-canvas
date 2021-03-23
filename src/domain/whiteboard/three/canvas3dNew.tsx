import React, {useContext, useEffect, useState} from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { WhiteboardContext } from '../WhiteboardContext';
import { v4 as uuidv4 } from 'uuid';
import './styles.css';
import { BufferGeometry } from 'three';
import { DEFAULT_VALUES } from '../../../config/toolbar-default-values';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { PaintEventSerializer } from '../../../poc/whiteboard/event-serializer/PaintEventSerializer';
import { I3dObject } from './I3dObject';

type ICanvas3dProps = {
  userId: string,
  width: number,
  height: number,
  eventSerializer: PaintEventSerializer,
  canvasId:string,
  active?: boolean,
  creating?:boolean,
  editing?: boolean,
  redrawing?:boolean,
  isOwn:boolean,
  json?: I3dObject
};

type ICanvas3dState = {
  isActive: boolean
}

class Canvas3d extends React.Component<ICanvas3dProps, ICanvas3dState> {
  static contextType = WhiteboardContext;

  canvasId?: string
  userId?: string 
  json: any
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  geometry?: THREE.BufferGeometry
  shape?: THREE.Mesh | THREE.LineSegments;
  dataURL: string = '';
  renderRequested: boolean | undefined = false;
  canvas?: Element | null;
  controls?: OrbitControls
  canvasPosition?: {left: number, top: number}
  canvasSize?: {width: number, height: number}
  shapeColor?: string
  shapeType?: string

  constructor(props: ICanvas3dProps) {
    super(props);
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.camera = new THREE.PerspectiveCamera();
    this.state = {isActive: false }
  }

  addRt3d = () => {
    this.setState({isActive: true})
    this.initRenderer();
    this.initCamera();
    this.initControls();
    this.recoverScene((this.props.json as I3dObject));
    this.initLights();
    this.rendererRender();
    // window.addEventListener('resize', this.requestRenderIfNotRequested);
  };

  init = () => {
    this.setState({isActive: true})
    this.initRenderer();
    this.initCamera();
    this.initControls();
    if(this.props.creating){
      this.shapeType = this.context.new3dShape
      this.shape = this.shapeCreation();
      this.scene.add(this.shape);
      this.canvasId = uuidv4()
      this.userId = this.props.userId
    }else{
      this.recoverScene(JSON.parse(this.context.json3D));
    } 
    this.initLights();
    this.rendererRender();
    if(this.props.creating){
      this.emitAdd3d()
    }
    // window.addEventListener('resize', this.requestRenderIfNotRequested);
  };

  recoverScene = (json3D: I3dObject) => {
    const loader = new THREE.ObjectLoader();
    // let jsonObj = JSON.parse(json3D);
    console.log('recovering...', json3D);
    this.canvasPosition = json3D.canvasPosition
    this.canvasSize = {width: json3D.canvasSize.width, height: json3D.canvasSize.height}
    this.renderer.setSize(this.canvasSize.width, this.canvasSize.height)
    this.scene = loader.parse(json3D.scene);
    const cameraPos = json3D.cameraPosition
    this.camera.position.set( cameraPos.x, cameraPos.y, cameraPos.z );
    this.controls?.update();
    this.shapeType = json3D.shape
    this.shapeColor = json3D.shapeColor
    this.shape = this.shapeCreation()
    this.scene.clear()
    this.scene.add(this.shape);
    this.rendererRender();
  };

  requestRenderIfNotRequested = () => {
    if (!this.renderRequested) {
      this.renderRequested = true;
      /**
       * Emits Real time exporting message
       */
      // this.props.eventSerializer.push('three', {type: 'move3d', target: {x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z}, id: this.props.userId});
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
    this.canvas = document.querySelector('#three-'+this.props.canvasId);
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
    this.canvasPosition = {top: height, left: width}
    this.renderer.setPixelRatio(window.devicePixelRatio);
  };

  update = () => {
    console.log("updating?????", this.context.camera3d)
      // console.log(this.context.shoud3dUpdate)
      this.camera.position.x = this.context.camera3d.x
      this.camera.position.y = this.context.camera3d.y
      this.camera.position.z = this.context.camera3d.z
      this.initControls()
      this.camera.updateProjectionMatrix();
      this.rendererRender()
      
  }

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

    switch (this.shapeType) {
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
      // case 'rectangularPrism':
      //   radius = 30;
      //   this.geometry = new THREE.TetrahedronGeometry(radius);
      //   break;
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

    let geometry: THREE.BufferGeometry | THREE.EdgesGeometry 
    if(this.shapeColor)
      geometry = this.geometry    
    else
      geometry = this.generateEdges()
    
    const shape = this.makeInstance(geometry, 0, 0, 0, false, this.shapeColor);
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
    color?: string | number | undefined | THREE.Color 
  ) {
    let material: THREE.MeshPhongMaterial | THREE.LineBasicMaterial | THREE.Line
    let shape: THREE.LineSegments | THREE.Mesh
    if(color){
      const material = new THREE.MeshPhongMaterial({
        color,
        // opacity: 0.1,
        // transparent: true,
      });
      // console.log(material)
      shape = new THREE.Mesh(geometry, material);

      // const material = new THREE.LineBasicMaterial({
      //   color, //0x494949
      // });
      // shape = new THREE.LineSegments(geometry, material);

    }else{
      // console.log(this.context.lineWidth, this.context.penColor, this.context.brushType)
      if (this.context.brushType === "dashed") {
        material = new THREE.LineDashedMaterial({
          color: this.context.penColor,
          linewidth: this.context.lineWidth,
          scale: 1,
          dashSize: 3,
          gapSize: 1,
          depthTest: true,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
        });
        shape = new THREE.LineSegments(geometry, material);
        shape.computeLineDistances();
      } else {
        material = new THREE.LineBasicMaterial({
          color: this.context.penColor,
          linewidth: this.context.lineWidth,
          depthTest: false,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
        });
        shape = new THREE.LineSegments(geometry, material);
        // shape.computeLineDistances();
      }
    } 
    
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

  generateJson = () => {
    this.json = {canvasId: this.canvasId, userId: this.props.userId, scene: this.scene.toJSON(), shapeColor: this.shapeColor, canvasPosition: this.canvasPosition, canvasSize: this.canvasSize, shape: this.shapeType, geometry: this.geometry?.toJSON(), cameraPosition: {x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z}}
  }

  export = () => {
    if(typeof this.canvasSize === "undefined") return
    if (this.dataURL === '') return
    this.edgesToGeometry()
    this.generateJson()
    this.context.set3dJson(JSON.stringify(this.json));
    console.log("exporting from 3d...", this.json)
    this.context.set3dImage(this.dataURL);
    /**
     * Resetting values
     */
    this.dataURL = '';
    this.shapeColor = undefined
    this.canvasPosition = undefined
    this.canvasSize = undefined
    this.shapeType = undefined
    this.geometry = undefined 
    
    /**
     * Updating context to inactivity
     */
    this.context.setEditing3d(false)
    this.context.setRedrawing3d(false)
    this.context.set3dActive(false)
    this.context.setCreating3d(false)
    this.context.setNew3dShape("")
    this.context.set3dCanvasPosition({top:DEFAULT_VALUES.OUT_OF_RANGE, left:DEFAULT_VALUES.OUT_OF_RANGE})
    this.setState({isActive: false})

    /**
     * Emits Real time exporting message
     */
    // this.props.eventSerializer.push('three', {type: 'exporting3d', target: this.shapeType, id: this.props.userId});
  }

  emitAdd3d = () => {
    if(typeof this.canvasSize === "undefined") return
    this.edgesToGeometry()
    this.generateJson()
    // JSON.stringify(this.json)
    /**
     * Emits Real time exporting message
     */
    console.log("emitting")
    this.props.eventSerializer.push('three', {type: 'add3d', target: JSON.stringify(this.json), id: this.userId ?? ''});
  }

  componentDidUpdate() {
    if(!this.props.isOwn || !this.state || ((!this.context.shoud3dUpdate) && this.state.isActive === this.props.active)) return
    console.log(this.state.isActive, this.props.active, this.props.userId,this.context.shoud3dUpdate)
    if(!this.props.isOwn){
      this.addRt3d()
      return
    }
    if(this.context.shoud3dUpdate){
      this.update()
      this.context.setShoud3dUpdate(false)
      return
    }
    if (this.is3dDrawing()){
      this.init();
      if(this.props.redrawing)
        this.export()
    }else{
      this.export()
    }
  }

  is3dDrawing = () => {
    return !this.context.shoud3dClose && this.props.active && (this.props.creating || this.props.editing || this.props.redrawing || !this.props.isOwn)
  }

  getCanvasPosition = () => {
    if(this.context.canvas3dPosition.top !== DEFAULT_VALUES.OUT_OF_RANGE){
      const style = {left: this.context.canvas3dPosition.left+'px', top: this.context.canvas3dPosition.top+'px'}
      console.log(style)
      return style
    }  
    return {}
  }

  renderScene = () => {
    return (
      this.is3dDrawing() && (
        <canvas className="three" style={this.getCanvasPosition()}  
         id={"three-"+this.props.canvasId}></canvas>
      )
    );
  };

  render() {
    return this.renderScene();
  }
}

export const withEventSerializerHOC = (Component: any) => {

  return (props: any) => {

    // const {
    //   shoud3dUpdate,
    //   setShoud3dUpdate,
    //   setCamera3d,
    //   camera3d
    // } = useContext(WhiteboardContext);
  
    // const [cameraPos, setCameraPos] = useState({x:0, y:0})
  
    // useEffect(() => {
      
    //   setCameraPos({x: camera3d.x, y: camera3d.y})
  
    //   // return () => {
    //   // };
    // }, [camera3d]);

    const {
      state: { eventSerializer },
    } = useSharedEventSerializer();

    return <Component /*cameraPos={cameraPos}*/ eventSerializer={eventSerializer} {...props} />;
  };
};

export default withEventSerializerHOC(Canvas3d);
