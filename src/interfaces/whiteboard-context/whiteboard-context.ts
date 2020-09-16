import ICanvasActions from '../../domain/whiteboard/canvas-actions/ICanvasActions';
import { IWhiteboardPermissions } from '../canvas-events/whiteboard-permissions';

export interface IWhiteboardContext {
  pointer: string;
  updatePointer: (pointer: string) => void;
  eraseType: string | null;
  updateEraseType: (type: string | null) => void;
  text: string;
  updateText: (text: string) => void;
  fontFamily: string;
  updateFontFamily: (font: string) => void;
  fontColor: string;
  updateFontColor: (color: string) => void;
  shape: string;
  updateShape: (shape: string) => void;
  shapeColor: string;
  updateShapeColor: (color: string) => void;
  fillColor: (color: string) => void;
  textColor: (color: string) => void;
  openClearWhiteboardModal: () => void;
  closeModal: () => void;
  penLine: string;
  updatePenLine: (pen: string) => void;
  penColor: string;
  updatePenColor: (color: string) => void;
  lineWidth: number;
  updateLineWidth: (width: number) => void;
  floodFill: string;
  updateFloodFill: (color: string) => void;
  stamp: string;
  updateStamp: (stamp: string) => void;
  pointerEvents: boolean;
  setPointerEvents: (status: boolean) => void;
  textIsActive: boolean;
  updateTextIsActive: (status: boolean) => void;
  shapeIsActive: boolean;
  updateShapeIsActive: (status: boolean) => void;
  brushIsActive: boolean;
  updateBrushIsActive: (status: boolean) => void;
  floodFillIsActive: boolean;
  updateFloodFillIsActive: (status: boolean) => void;
  eventedObjects: boolean;
  updateEventedObjects: (status: boolean) => void;
  shapesAreSelectable: boolean;
  updateShapesAreSelectable: (status: boolean) => void;
  shapesAreEvented: boolean;
  updateShapesAreEvented: (status: boolean) => void;
  updateCanvasActions: (actions: ICanvasActions) => void;
  laserIsActive: boolean;
  updateLaserIsActive: (status: boolean) => void;
  discardActiveObject: () => void;
  changeStrokeColor: (color: string) => void;
  addShape: (shape: string) => void;
  eraseObject: () => void;
  undo: () => void;
  redo: () => void;
  allowPointer: boolean;
  universalPermits: (id: string) => boolean;
  clear: (filterUsers?: string[]) => void;
  clearSelf: () => void;
  toolbarIsEnabled: boolean;
  setToolbarIsEnabled: (enabled: boolean) => void;
  pointerIsEnabled: boolean;
  setPointerIsEnabled: (enabled: boolean) => void;
  clearIsActive: boolean;
  updateClearIsActive: (active: boolean) => void;
  permissions: IWhiteboardPermissions;
}
