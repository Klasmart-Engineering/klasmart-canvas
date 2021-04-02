import { I3dObject } from '../domain/whiteboard/three/I3dObject';

const emptyRedrawing3dObjects : I3dObject[] = []
const OUT_OF_RANGE = 999999

export const DEFAULT_VALUES = {
  IS_3D_SELECTED: false,
  NEW_SHAPE: "",
  NEW_IMAGE: "",
  JSON_3D: "",
  SHAPE_3D: 'cube',
  REDRAWING_3D: false,
  REDRAWING_3D_OBJECTS: emptyRedrawing3dObjects,
  EDITING_3D: false,
  CREATING_3D: false,
  CANVAS_POSITION: {top:OUT_OF_RANGE, left:OUT_OF_RANGE},
  OUT_OF_RANGE,
  ADDING_OBJECT: null,
  REMOVING_OBJECT: null,
  MOVING_OBJECT: null,
  PAINTING_3D: false,
  GROUP_REDRAWING_3D_STATUS: ""
};
