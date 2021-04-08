export interface I3dObject {
  canvasId: string,
  ownerId: string,
  object2dId?:string,
  scene: object,
  shapeColor: string,
  canvasPosition: {left: number, top: number},
  canvasSize: {width: number, height: number},
  canvasRotation: number,
  shape: string,
  geometry: object,
  cameraPosition: {
    x: number,
    y: number,
    z: number,
  }
  previousState: I3dObject,
  brushType: string,
  dataURL: string,
  penColor: string,
  lineWidth: number,
  isFlipped: boolean
};
