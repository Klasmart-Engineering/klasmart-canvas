import React, { useContext } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { WhiteboardContext } from '../WhiteboardContext';
import './styles.css';
import { BufferGeometry } from 'three';
import { DEFAULT_VALUES } from '../../../config/toolbar-default-values';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { PaintEventSerializer } from '../event-serializer/PaintEventSerializer';
import { useEffect } from 'react';


type ICanvas3dProps = {
  userId: string,
  width: number,
  height: number
};

const Canvas3d = (props : ICanvas3dProps) => {
  
  const {
    is3dActive,
    new3dShape,
    json3D,
    redrawing3d,
    creating3d,
    brushType,
    penColor,
    lineWidth,
    set3dJson,
    set3dImage,
    setEditing3d,
    setRedrawing3d,
    set3dActive,
    setCreating3d,
    setNew3dShape,
    set3dCanvasPosition,
    editing3d,
    canvas3dPosition
  } = useContext(WhiteboardContext);

  let scene: THREE.Scene = new THREE.Scene();
  let renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  let camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
  let geometry: THREE.BufferGeometry | undefined
  let shape: THREE.Mesh | THREE.LineSegments;
  let dataURL: string = '';
  let renderRequested: boolean | undefined = false;
  let canvas: Element | null;
  let controls: OrbitControls
  let canvasPosition: {left: number, top: number} | undefined
  let canvasSize: {width: number, height: number} | undefined
  let shapeColor: string | undefined
  let shapeType: string | undefined


  const init = () => {
    initRenderer();
    initCamera();
    initControls();
    if(creating3d){
      shapeType = new3dShape
      shape = shapeCreation();
      scene.add(shape);
    }else{
      //(editing3d || redrawing3d){
      recoverScene();
    } 
    initLights();
    rendererRender();
    // window.addEventListener('resize', requestRenderIfNotRequested);
  };

  const recoverScene = () => {
    const loader = new THREE.ObjectLoader();
    let jsonObj = JSON.parse(json3D);
    console.log('recovering...', jsonObj);
    canvasPosition = jsonObj.canvasPosition
    canvasSize = {width: jsonObj.canvasSize.width, height: jsonObj.canvasSize.height}
    renderer.setSize(canvasSize.width, canvasSize.height)
    scene = loader.parse(jsonObj.scene);
    const cameraPos = jsonObj.cameraPosition
    camera.position.set( cameraPos.x, cameraPos.y, cameraPos.z );
    controls?.update();
    shapeType = jsonObj.shape
    shapeColor = jsonObj.shapeColor
    shape = shapeCreation()
    scene.clear()
    scene.add(shape);
    rendererRender();
  };

  const requestRenderIfNotRequested = () => {
    if (!renderRequested) {
      renderRequested = true;
      requestAnimationFrame(rendererRender);
    }
  };

  const initControls = () => {
    controls = new OrbitControls(camera, canvas as HTMLElement);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    controls.enableZoom = false;
    controls.update();
    controls.addEventListener('change', requestRenderIfNotRequested);
  };

  const initLights = () => {
    addLight(-1, 2, 4);
    addLight(1, -1, -2);
  };

  const initCamera = () => {
    const fov = 40;
    const aspect = props.width / props.height; //2; // the canvas default
    const near = 0.1;
    const far = 125; //25;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 90;
  };

  const initRenderer = () => {
    renderer = new THREE.WebGLRenderer();
    scene.clear();
    canvas = document.querySelector('#three-'+props.userId);
    renderer = new THREE.WebGLRenderer({
      canvas: canvas as HTMLCanvasElement,
      alpha: true,
      antialias: true,
    });
    renderer.setClearColor(0xffffff, 0);
    const width = props.width / 3
    const height = props.height / 3
    renderer.setSize(width, height);
    canvasSize = {width, height}
    renderer.setPixelRatio(window.devicePixelRatio);
  };

  const getGeometry = () => {
    let geometry: THREE.BufferGeometry | THREE.EdgesGeometry    
    let size = 32; //16
    let widthSegments = 1;
    let heightSegments = 1;
    let depthSegments = 1;

    let height = 25;
    let radialSegments = 50;
    let radius = 20;
    let radiusTop = 20;
    let radiusBottom = 20;

    switch (shapeType) {
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
        radialSegments = 6;
        const tubularSegments = 10;
        geometry = new THREE.TorusGeometry(
          radius,
          tubeRadius,
          radialSegments,
          tubularSegments
        );
        break;
      // case 'rectangularPrism':
      //   radius = 30;
      //   geometry = new THREE.TetrahedronGeometry(radius);
      //   break;
      default:
        size = 32; //32
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

    if(!shapeColor)
      geometry = generateEdges(geometry)
    
    return geometry
  }

  const shapeCreation = () => {

    const geometry = getGeometry()      
    
    const shape = makeInstance(geometry, 0, 0, 0, false, shapeColor);
    return shape;
    // scene.add(shape);
  };

  const generateEdges = (geometry: THREE.BufferGeometry | THREE.EdgesGeometry) => {
    const thresholdAngle = 15;
    return new THREE.EdgesGeometry(geometry, thresholdAngle);
  }


  const edgesToGeometry = () => {
    
    scene.clear()
    const geometry = getGeometry() 
    shape = makeInstance(geometry, 0, 0, 0, false);
    scene.add(shape)
    // rendererRender()
  }

  const resizeRendererToDisplaySize = () => {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  };

  const rendererRender = () => {
    renderRequested = undefined;

    // if (resizeRendererToDisplaySize()) {
    //   const canvas = renderer.domElement;
    //   camera.aspect = canvas.clientWidth / canvas.clientHeight;
    //   camera.updateProjectionMatrix();
    // }

    renderer.render(scene, camera);
    dataURL = renderer.domElement.toDataURL();
  };

  const hsl = (h: number, s: number, l: number) => {
    return new THREE.Color().setHSL(h, s, l);
  }

  const makeInstance = (
    geometry: any,
    x: number,
    y: number,
    z: number,
    dashed: boolean,
    color?: string | number | undefined | THREE.Color 
  ) => {
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
      // console.log(lineWidth, penColor, brushType)
      if (brushType === "dashed") {
        material = new THREE.LineDashedMaterial({
          color: penColor,
          linewidth: lineWidth,
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
          color: penColor,
          linewidth: lineWidth,
          depthTest: false,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
        });
        shape = new THREE.LineSegments(geometry, material);
      }
    } 
    
    shape.rotateY(22.5);

    shape.position.x = x;
    shape.position.set(x, y, z);

    return shape;
  }

  const addLight = (x: number, y: number, z: number) => {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    scene.add(light);
  };

  const exportTo2d = () => {
    if(typeof canvasSize === "undefined") return
    if (dataURL === '') return
    edgesToGeometry()
    const jsonObj = {scene: scene.toJSON(), shapeColor: shapeColor, canvasPosition: canvasPosition, canvasSize: canvasSize, shape: shapeType, geometry: geometry?.toJSON(), cameraPosition: {x: camera.position.x, y: camera.position.y, z: camera.position.z}}
    set3dJson(JSON.stringify(jsonObj));
    console.log("exporting from 3d...", jsonObj)
    set3dImage(dataURL);
    /**
     * Resetting values
     */
    dataURL = '';
    shapeColor = undefined
    canvasPosition = undefined
    canvasSize = undefined
    shapeType = undefined
    geometry = undefined 
    
    /**
     * Updating context to inactivity
     */
    setEditing3d(false)
    setRedrawing3d(false)
    set3dActive(false)
    setCreating3d(false)
    setNew3dShape("")
    set3dCanvasPosition({top:DEFAULT_VALUES.OUT_OF_RANGE, left:DEFAULT_VALUES.OUT_OF_RANGE})
  }

  useEffect( () => {
    console.log("is3dActive", is3dActive)
    if (is3dDrawing()){
      init();
      if(redrawing3d)
        exportTo2d()
    }else{
      // eventSerializer.push('three', {type: 'creating3d', target: shapeType, id: props.userId});
      exportTo2d()
    }
  }, [is3dActive, creating3d, editing3d, redrawing3d] )

  const is3dDrawing = () => {
    return is3dActive && (creating3d || editing3d || redrawing3d)
  }

  const getCanvasPosition = () => {
    if(canvas3dPosition.top !== DEFAULT_VALUES.OUT_OF_RANGE){
      const style = {left: canvas3dPosition.left+'px', top: canvas3dPosition.top+'px'}
      console.log(style)
      return style
    }  
    console.log("no canv pos")
    return {}
  }

  const renderScene = () => {
    return (
      is3dDrawing() ?  (
        <canvas className="three" style={getCanvasPosition()}  
         id={"three-"+props.userId}></canvas>
      ) : null
      // <canvas className="three" style={getCanvasPosition()}  
      //    id={"three-"+props.userId}></canvas>
    );
  };

  return renderScene();
  
}


export default Canvas3d;
