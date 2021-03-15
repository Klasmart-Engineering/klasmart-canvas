import { MutableRefObject } from 'react';
import ICanvasActions from '../../domain/whiteboard/canvas-actions/ICanvasActions';
import { IBrushType } from '../brushes/brush-type';
import { IStampMode } from '../stamps/stamp-mode';
import { ICanvasObject } from '../objects/canvas-object';
import { IPointerType } from '../pointers/pointer-type';

export interface IWhiteboardContext {
  pointer: IPointerType;
  updatePointer: (pointer: IPointerType) => void;
  eraseType: string | null;
  updateEraseType: (type: string | null) => void;
  text: string;
  updateText: (text: string) => void;
  fontFamily: string;
  updateFontFamily: (font: string) => void;
  fontColor: string;
  updateFontColor: (color: string) => void;
  colorsList: string[];
  shape: string;
  updateShape: (shape: string) => void;
  shapeColor: string;
  updateShapeColor: (color: string) => void;
  fillColor: (color: string) => void;
  textColor: (color: string) => void;
  closeModal: () => void;
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
  canvasActions: ICanvasActions | undefined;
  updateCanvasActions: (actions: ICanvasActions) => void;
  laserIsActive: boolean;
  updateLaserIsActive: (status: boolean) => void;
  isLocalObject: (
    id: string,
    canvasId: string | undefined
  ) => boolean | undefined;
  discardActiveObject: () => void;
  changeStrokeColor: (color: string) => void;
  changeBrushType: (type: IBrushType) => void;
  addShape: (shape: string) => void;
  eraseObject: () => void;
  undo: () => void;
  redo: () => void;
  clearWhiteboard: () => void;
  clearWhiteboardAllowClearOthers: (userId: string) => void;
  clearWhiteboardClearAll: () => void;
  pointerIsEnabled: boolean;
  clearIsActive: boolean;
  updateClearIsActive: (active: boolean) => void;
  allToolbarIsEnabled: boolean;
  userId?: string;
  lineWidthIsActive: boolean;
  updateLineWidthIsActive: (active: boolean) => void;
  brushType: IBrushType;
  updateBrushType: (type: IBrushType) => void;
  imagePopupIsOpen: boolean;
  updateImagePopupIsOpen: (open: boolean) => void;
  activeCanvas: MutableRefObject<string | null>;
  perfectShapeIsActive: boolean;
  updatePerfectShapeIsActive: (active: boolean) => void;
  perfectShapeIsAvailable: () => boolean;
  partialEraseIsActive: boolean;
  updatePartialEraseIsActive: (status: boolean) => void;
  openUploadFileModal: () => void;
  closeUploadFileModal: () => void;
  image: string | File;
  setImage: (image: string | File) => void;
  isGif: boolean;
  setIsGif: (status: boolean) => void;
  backgroundImage: string | File;
  setBackgroundImage: (image: string | File) => void;
  backgroundImageIsPartialErasable: boolean;
  setBackgroundImageIsPartialErasable: (status: boolean) => void;
  isBackgroundImage: boolean;
  setIsBackgroundImage: (status: boolean) => void;
  localImage: string | File;
  setLocalImage: (image: string | File) => void;
  openClearWhiteboardModal: () => void;
  openStampModal: () => void;
  eraserIsActive: boolean;
  updateEraserIsActive: (status: boolean) => void;
  backgroundColor: string;
  updateBackgroundColor: (color: string) => void;
  fillBackgroundColor: (color: string) => void;
  setBackgroundColorInCanvas: (color: string) => void;
  localBackground: boolean;
  setLocalBackground: (condition: boolean) => void;
  stampMode: IStampMode;
  updateStampMode: (mode: IStampMode) => void;
  stampIsActive: boolean;
  updateStampIsActive: (status: boolean) => void;
  stampAssignedStudents: string[];
  updateStampAssignedStudents: (studentIds: string[]) => void;
  displayUserInfo: string;
  openSetUserInfoToDisplayModal: () => void;
  isDrawing: boolean;
  updateIsDrawing: (isIt: boolean) => void;
  selectedTool: string;
  updateSelectedTool: (tool: string) => void;
  isCursorObject: (object: ICanvasObject) => boolean;
  findObjectById: (id: string) => ICanvasObject | undefined;
  eventSerializer: any;
  eventController: any;
  activeTool: string | null;
  setActiveTool: (arg: string | null) => void;
  is3dActive: boolean,
  set3dActive: (active: boolean) => void
  shape3d: string;
  update3dShape: (shape: string) => void;
  new3dImage: string,
  set3dImage: (dataUrl: string) => void 
  json3D: string,
  set3dJson: (stringifiedJson: string) => void 
  resizing3d: boolean,
  setResizing3d: (isIt: boolean) => void 
}
