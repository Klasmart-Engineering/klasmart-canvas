import React from 'react';
import * as THREE from 'three';
import { BufferGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { WhiteboardContext } from '../../WhiteboardContext';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_VALUES as TOOLBAR_DEFAULT_VALUES } from '../../../../config/toolbar-default-values';
import { DEFAULT_VALUES as THREE_DEFAULT_VALUES } from '../../../../config/threeD-default-values';
import { I3dObject } from '../I3dObject';
import { ICanvas3dProps, ICanvas3dState } from './types';
import './styles.css';

/**
 * Class Component for drawing a 3d canvas. Implements three.js library.
 */
class Canvas3d extends React.Component<ICanvas3dProps, ICanvas3dState> {
  static contextType = WhiteboardContext;

  id?: string;
  ownerId?:string
  object2dId?:string
  json: any;
  previousState: any;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  geometry?: THREE.BufferGeometry;
  shape?: THREE.Mesh | THREE.LineSegments;
  dataURL: string = '';
  renderRequested: boolean | undefined = false;
  canvas?: Element | null;
  controls?: OrbitControls;
  canvasPosition?: { left: number; top: number };
  canvasSize?: { width: number; height: number };
  canvasRotation = 0
  shapeColor?: string;
  shapeType?: string;
  brushType: string = TOOLBAR_DEFAULT_VALUES.PEN_LINE;
  penColor: string = TOOLBAR_DEFAULT_VALUES.PEN_COLOR;
  lineWidth: number = TOOLBAR_DEFAULT_VALUES.LINE_WIDTH;

  constructor(props: ICanvas3dProps) {
    super(props);
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.camera = new THREE.PerspectiveCamera();
    this.state = { isActive: false };
  }

  /**
   * Initialize the 3d rederer, camera, scene and shape.
   */
  init = () => {
    this.setState({ isActive: true });
    this.initRenderer();
    this.initCamera();
    this.initControls();
    this.controls?.addEventListener('change', this.requestRenderIfNotRequested);

    if (this.context.creating3d) {
      /**
       * If context state is creating3d a new shape
       */
      this.penColor = this.context.penColor;
      this.brushType = this.context.brushType;
      this.lineWidth = this.context.lineWidth;
      this.shapeType = this.context.new3dShape;
      this.shape = this.shapeCreation();
      this.scene.add(this.shape);
      this.id = uuidv4();
      this.ownerId = this.props.ownerId
    } else {
      /**
       * Otherwise, the scene is recovered
       */
      this.recoverScene();
    }
    /**
     * Then, lights are initialized and scene is rerendered.
     */
    this.initLights();
    this.rendererRender();
    if (this.context.creating3d) {
      /**
       * If it's creating a new shape, Real Time event is emitted
       */
      this.emitAdd3d();
    }
    // window.addEventListener('resize', this.requestRenderIfNotRequested);
  };

  /**
   * Gets 3d shapes being changed as a group in 2d canvas, redraw and export them to 2d again
   */
  groupRedrawAndExport = () => {
    const objects3d: I3dObject[] = [];
    /**
     * Iterate each object
     */
    for (let item of this.context.redrawing3dObjects) {
      /**
       * Initialize
       */
      this.setState({ isActive: true });
      this.initRenderer();
      this.initCamera();
      this.initControls();
      this.controls?.addEventListener(
        'change',
        this.requestRenderIfNotRequested
      );

      /**
       * Scene recover
       */
      this.recoverScene(item);
      this.initLights();
      this.rendererRender();

      this.generateJson();
      objects3d.push(this.json);
    }
    /**
     * Export in ad hoc context state and update ad hoc context state
     */
    this.context.setRedrawing3dObjects(objects3d);
    this.context.setGroupRedrawing3dStatus('exporting');

    /**
     * Close 3d canvas
     */
    this.close();
  };

  /**
   * Initialize 3d canvas on real time demand -from another user-
   */
  addRt3d = () => {
    this.setState({ isActive: true });
    this.initRenderer();
    this.initCamera();
    this.initControls();
    this.recoverScene(this.props.json);
    this.initLights();
    this.rendererRender();
  };

  /**
   * Recover a scene from a saved json
   * @param {I3dObject} jsObj - the scene saved in a json. Optional. If not present, it gets it from the state context.
   */
  recoverScene = (jsObj?: I3dObject) => {
    const loader = new THREE.ObjectLoader();
    let jsonObj = jsObj ?? JSON.parse(this.context.json3D);
    this.object2dId = jsonObj.object2dId
    this.canvasPosition = jsonObj.canvasPosition;
    this.canvasSize = {
      width: jsonObj.canvasSize.width,
      height: jsonObj.canvasSize.height,
    };
    this.renderer.setSize(this.canvasSize.width, this.canvasSize.height);
    this.canvasRotation = jsonObj.canvasRotation
    try {
      this.scene = loader.parse(jsonObj.scene);
    } catch (error) {
      console.warn(error) 
    }
    const cameraPos = jsonObj.cameraPosition;
    this.camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
    this.controls?.update();
    this.shapeType = jsonObj.shape;
    this.shapeColor = jsonObj.shapeColor;
    this.penColor = jsonObj.penColor;
    this.brushType = jsonObj.brushType;
    this.shape = this.shapeCreation();
    this.scene.clear();
    this.scene.add(this.shape);
    this.rendererRender();
  };

  /**
   * Handle event of camera rotation on control change
   */
  requestRenderIfNotRequested = () => {
    if (!this.renderRequested) {
      this.renderRequested = true;
      const json = this.generateScreenshot();
      /**
       * Emits Real time exporting message
       */
      this.props.eventSerializer.push('three', {
        type: 'move3d',
        target: JSON.stringify(json),
        id: this.props.userId ?? '',
      });
      requestAnimationFrame(this.rendererRender);
    }
  };

  /**
   * Initialize orbit controls, camera controls. Allow to orbit the shape.
   * This is the natural solution provided by the library to achieve the shape x and y axis rotation requested.
   */
  initControls = () => {
    this.controls = new OrbitControls(this.camera, this.canvas as HTMLElement);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 0, 0);
    this.controls.enableZoom = false;
    this.controls.update();
  };

  /**
   * Initialize the lights, needed to see the 3d shape
   */
  initLights = () => {
    this.addLight(-1, 2, 4);
    this.addLight(1, -1, -2);
  };

  /**
   * Initialize the camera, needed to see the 3d shape
   */
  initCamera = () => {
    const fov = 40;
    const aspect = this.props.width / this.props.height;
    const near = 0.1;
    const far = 125;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = 90;
  };

  /**
   * Initialize the 3d webgl renderer
   */
  initRenderer = () => {
    this.renderer = new THREE.WebGLRenderer();
    this.scene.clear();

    /**
     * Get the html canvas, identified by the user and canvas ids
     * From three.js docs. No way to avoid the dom selector :(
     */
    this.canvas = document.querySelector(
      '#three-' + this.props.userId + '-' + this.props.canvasId
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas as HTMLCanvasElement,
      alpha: true,
      antialias: true,
    });
    this.renderer.setClearColor(0xffffff, 0);
    const width = this.props.width / 3;
    const height = this.props.height / 3;
    this.renderer.setSize(width, height);
    this.canvasSize = { width, height };
    this.canvasPosition = { top: height, left: width };
    this.canvasRotation = 0
    this.renderer.setPixelRatio(window.devicePixelRatio);
  };

  /**
   * Update scene from other user, on Real time request
   */

  update = () => {
    if (!this.props.json) return;
    this.recoverScene(this.props.json);
    this.initControls();
    this.camera.updateProjectionMatrix();
    this.initLights();
    this.rendererRender();
  };

  /**
   * Shape Creation
   */
  shapeCreation = () => {
    /**
     * Hardcoded values for sizing were selected because the new shape seems ok with them
     * And due to client request of avoiding multiple edges
     */
    let size = 32;
    let widthSegments = 1;
    let heightSegments = 1;
    let depthSegments = 1;

    let height = 25;
    let radialSegments = 50;
    let radius = 20;
    let radiusTop = 20;
    let radiusBottom = 20;

    /**
     * Create a native three.js geometry shape
     * https://threejs.org/docs/#api/en/geometries/BoxGeometry
     */
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
      default:
        /**
         * Cube is default shape
         */
        size = 32;
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

    /**
     * If the shape is flood filled, the geometry is wrapped in an Edges Geometry
     */
    let geometry: THREE.BufferGeometry | THREE.EdgesGeometry;
    if (this.shapeColor) geometry = this.geometry;
    else geometry = this.generateEdges();

    const shape = this.makeInstance(geometry, 0, 0, 0, this.shapeColor);
    return shape;
  };

  /**
   * Generate an Edges Geometry from a Geometry
   */
  generateEdges = () => {
    const geometry = this.geometry ?? new BufferGeometry();
    const thresholdAngle = 15;
    return new THREE.EdgesGeometry(geometry, thresholdAngle);
  };

  /**
   * Get the geometry shape without wrapping edges
   */
  edgesToGeometry = () => {
    this.scene.clear();
    this.shape = this.makeInstance(this.geometry, 0, 0, 0);
    this.scene.add(this.shape);
  };

  /**
   * Resize rederer according to canvas size
   * Not in use. It would be useful for handling some possible needed responsiveness scenarios
   */
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

  /**
   * Render renderer
   */
  rendererRender = () => {
    this.renderRequested = undefined;

    /**
     * Commented because not in use for the moment.
     */
    // if (this.resizeRendererToDisplaySize()) {
    //   const canvas = this.renderer.domElement;
    //   this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    //   this.camera.updateProjectionMatrix();
    // }

    this.renderer.render(this.scene, this.camera);

    /**
     * Get the data url image from the 3d scene/renderer
     */
    this.dataURL = this.renderer.domElement.toDataURL();
  };

  /**
   * Create a Three.js Color
   * @param h hue
   * @param s saturation
   * @param l lightness
   */
  hsl(h: number, s: number, l: number) {
    return new THREE.Color().setHSL(h, s, l);
  }

  /**
   * Generate a shape instance
   * @param geometry Threejs Geometry
   * @param x x axis position
   * @param y y axis position
   * @param z z axis position
   * @param color color
   * @return shape
   */
  makeInstance(
    geometry: any,
    x: number,
    y: number,
    z: number,
    color?: string | number | undefined | THREE.Color
  ) {
    let material:
      | THREE.MeshPhongMaterial
      | THREE.LineBasicMaterial
      | THREE.Line;
    let shape: THREE.LineSegments | THREE.Mesh;

    /**
     * If there is a color, it creates a phong material.
     * Otherwise a line segments that wraps a line -dashed or not- material, needed to create a transparent shape seen by its edges.
     */
    if (color) {
      const material = new THREE.MeshPhongMaterial({
        color,
      });

      shape = new THREE.Mesh(geometry, material);
    } else {
      if (this.brushType === 'dashed') {
        material = new THREE.LineDashedMaterial({
          color: this.penColor,
          linewidth: this.lineWidth,
          scale: 1,
          dashSize: 3,
          gapSize: 1,
          depthTest: true,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
        });
        shape = new THREE.LineSegments(geometry, material);
        try {
          shape.computeLineDistances();
        } catch (error) {
          console.warn(error);
        }
      } else {
        material = new THREE.LineBasicMaterial({
          color: this.penColor,
          linewidth: this.lineWidth,
          depthTest: false,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
        });
        shape = new THREE.LineSegments(geometry, material);
      }
    }

    /**
     * Rotation hardcoded to optimize the 3d perception
     */
    shape.rotateY(22.5);

    shape.position.x = x;
    shape.position.set(x, y, z);

    return shape;
  }

  /**
   * Create a Light
   * @param {number} x x axis position
   * @param {number} y y axis position
   * @param {number} z z axis position
   */
  addLight = (x: number, y: number, z: number) => {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    this.scene.add(light);
  };

  /**
   * Generate a json of the canvas 3d scene and save it in component attribute
   */
  generateJson = () => {
    this.json = {
      canvasId: this.id,
      object2dId: this.object2dId,
      ownerId: this.props.ownerId,
      scene: this.scene.toJSON(),
      shapeColor: this.shapeColor,
      canvasPosition: this.canvasPosition,
      canvasSize: this.canvasSize,
      shape: this.shapeType,
      geometry: this.geometry?.toJSON(),
      cameraPosition: {
        x: this.camera.position.x,
        y: this.camera.position.y,
        z: this.camera.position.z,
      },
      previousState: this.json,
      brushType: this.brushType,
      dataURL: this.dataURL,
      penColor: this.penColor,
      lineWidth: this.lineWidth,
      canvasRotation: this.canvasRotation
    };
  };

  /**
   * Export scene in context state as stringified json and data url image
   */
  export = () => {
    if (typeof this.canvasSize === 'undefined') return;
    if (this.dataURL === '') return;
    this.edgesToGeometry();
    this.generateJson();
    this.context.set3dJson(JSON.stringify(this.json));
    this.context.set3dImage(this.dataURL);
    this.close();
  };

  /**
   * Reset attributes and context states
   */
  close = () => {
    /**
     * Resetting values
     */
    this.dataURL = '';
    this.shapeColor = undefined;
    this.canvasPosition = undefined;
    this.canvasSize = undefined;
    this.shapeType = undefined;
    this.geometry = undefined;
    this.canvasRotation = 0

    /**
     * Updating context to inactivity
     */
    this.context.setEditing3d(false);
    this.context.setRedrawing3d(false);
    this.context.set3dActive(false);
    this.context.setCreating3d(false);
    this.context.setNew3dShape('');
    this.context.set3dCanvasPosition({
      top: THREE_DEFAULT_VALUES.OUT_OF_RANGE,
      left: THREE_DEFAULT_VALUES.OUT_OF_RANGE,
    });
    // this.context.setShould3dUpdate(false);
    this.setState({ isActive: false });

    /**
     * Emits Real time exporting message
     */
    if (this.json) {
      this.props.eventSerializer.push('three', {
        type: 'remove3d',
        target: JSON.stringify(this.json),
        id: this.props.userId ?? '',
      });
    }
  };

  /**
   * Recover scene on undo/redo.
   * Not in use. Kept for possible implementation.
   */
  undoRedo = () => {
    /**
     * If it is open, close. Otherwise recover requested state
     */
    if (this.context.is3dActive) {
      this.generateJson();
      this.close();
    } else {
      if (this.context.json3D === '') return this.close();

      let jsonObj = JSON.parse(this.context.json3D);
      this.recoverScene(jsonObj.previousState);
      this.initLights();
      this.rendererRender();
      this.export();
    }
  };

  /**
   * Emit Real time event on shape added
   */
  emitAdd3d = () => {
    if (typeof this.canvasSize === 'undefined') return;
    const json = this.generateScreenshot();
    /**
     * Emits Real time exporting message
     */
    this.props.eventSerializer.push('three', {
      type: 'add3d',
      target: JSON.stringify(json),
      id: this.props.userId ?? '',
    });
  };

  /**
   * Generate a screenshot of the scene
   * @return json of the scene
   */
  generateScreenshot = () => {
    const scene = new THREE.Scene();
    scene.clear();
    const shape = this.makeInstance(this.geometry, 0, 0, 0);
    scene.add(shape);
    const json = {
      canvasId: this.id,
      object2dId: this.object2dId,
      ownerId: this.props.ownerId,
      scene: scene.toJSON(),
      shapeColor: this.shapeColor,
      canvasPosition: this.canvasPosition,
      canvasSize: this.canvasSize,
      shape: this.shapeType,
      geometry: this.geometry?.toJSON(),
      cameraPosition: {
        x: this.camera.position.x,
        y: this.camera.position.y,
        z: this.camera.position.z,
      },
      previousState: this.json,
      brushType: this.brushType,
      dataURL: this.dataURL,
      penColor: this.penColor,
      lineWidth: this.lineWidth,
      canvasRotation: this.canvasRotation
    };
    return json;
  };

  componentDidMount() {
    /**
     * As the 3d canvas owned by the user won't be display on App start, just the
     * not owned 3d canvas need to perform an initialization on component mount
     */
    if (!this.props.isOwn) {
      this.addRt3d();
    }
  }

  componentDidUpdate() {
    /**
     * Scenarios where nothing should happen
     */
    if (
      !this.state ||
      (this.props.isOwn &&
        // !this.context.should3dUpdate &&
        this.state.isActive === this.context.is3dActive)
    )
      return;

    /**
     * If the 3d canvas is not owned, the update method is called.
     */
    if (!this.props.isOwn) {
      this.update();
      return;
    }

    /**
     * Checks if the canvas is being drawn
     */
    if (this.is3dDrawing()) {
      /**
       * If the redrawing is for multiple canvas -group action-
       */
      if (this.context.groupRedrawing3dStatus === 'redrawing') {
        this.groupRedrawAndExport();
        return;
      }

      /**
       * Otherwise, the scene is initialized from scratch or it will be recovered from the json prop.
       */
      this.init();
      if (this.context.redrawing3d) {
        this.export();
      }
      return;
    }

    /**
     * If the context state is true, the undo/redo method is called
     * Not in used. Kept for possible implementation.
     */
    // if (this.context.should3dUpdate) {
    //   this.undoRedo();
    //   return;
    // }

    /**
     * If not returned before, the scene should be exported to 2d canvas.
     */
    this.export();
  }

  /**
   * Check if the 3d scene should be drawn
   */
  is3dDrawing = () => {
    return (
      !this.props.isOwn ||
      //   !this.context.should3dUpdate &&
      this.context.groupRedrawing3dStatus === 'redrawing' ||
      (this.context.is3dActive &&
        (this.context.creating3d ||
          this.context.editing3d ||
          this.context.redrawing3d))
    );
  };

  /**
   * Get the 3d canvas CSS left and top values
   */
  getCanvasStyles = () => {
    if (
      this.context.canvas3dPosition.top !== THREE_DEFAULT_VALUES.OUT_OF_RANGE
    ) {
      const style = {
        left: this.context.canvas3dPosition.left + 'px',
        top: this.context.canvas3dPosition.top + 'px',
        transform: "rotate("+this.canvasRotation+"deg)"
      };
      return style;
    }
    if (!this.props.isOwn) {
      if (!this.props.json) return;
      const style = {
        left: this.props.json.canvasPosition.left + 'px',
        top: this.props.json.canvasPosition.top + 'px',
        transform: "rotate("+this.props.json.canvasRotation+"deg)"
      };
      return style;
    }
    return {};
  };

  /**
   * Render canvas element
   */
  renderScene = () => {
    return (
      this.is3dDrawing() && (
        <canvas
          className={
            'three ' + (this.props.isOwn ? 'three-own' : 'three-others')
          }
          style={this.getCanvasStyles()}
          id={'three-' + this.props.userId + '-' + this.props.canvasId}
        ></canvas>
      )
    );
  };

  render() {
    return this.renderScene();
  }
}

export default Canvas3d;
