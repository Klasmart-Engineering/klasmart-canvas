export interface I3dObject {
  canvasId: string,
  ownerId: string,
  scene: object,
  shapeColor: string,
  canvasPosition: {left: number, top: number},
  canvasSize: {width: number, height: number},
  shape: string,
  geometry: object,
  cameraPosition: {
    x: number,
    y: number,
    z: number,
  }
};
