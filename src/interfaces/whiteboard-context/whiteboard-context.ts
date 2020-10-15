import { MutableRefObject } from 'react';
import ICanvasActions from '../../domain/whiteboard/canvas-actions/ICanvasActions';

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
  colorsList: string[];
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
  isLocalObject: (
    id: string,
    canvasId: string | undefined
  ) => boolean | undefined;
  discardActiveObject: () => void;
  changeStrokeColor: (color: string) => void;
  addShape: (shape: string) => void;
  eraseObject: () => void;
  undo: () => void;
  redo: () => void;
  clearWhiteboard: () => void;
  clearWhiteboardAllowClearOthers: (userId: string) => void;
  clearWhiteboardClearAll: () => void;
  toolbarIsEnabled: boolean;
  setToolbarIsEnabled: (enabled: boolean) => void;
  pointerIsEnabled: boolean;
  setPointerIsEnabled: (enabled: boolean) => void;
  clearIsActive: boolean;
  updateClearIsActive: (active: boolean) => void;
  serializerToolbarState: {
    pointer: boolean;
    move: boolean;
    erase: boolean;
    partialErase: boolean;
    pen: boolean;
    floodFill: boolean;
    text: boolean;
    shape: boolean;
    undoRedo: boolean;
    clearWhiteboard: boolean;
    uploadImage: boolean;
    backgroundColor: boolean;
  };
  setSerializerToolbarState: (enabled: {
    [p: string]: boolean;
    pointer: boolean;
    move: boolean;
    erase: boolean;
    partialErase: boolean;
    pen: boolean;
    floodFill: boolean;
    text: boolean;
    shape: boolean;
    undoRedo: boolean;
    clearWhiteboard: boolean;
    uploadImage: boolean;
    backgroundColor: boolean;
  }) => void;
  allToolbarIsEnabled: boolean;
  lineWidthIsActive: boolean;
  updateLineWidthIsActive: (active: boolean) => void;
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
  backgroundColor: string;
  updateBackgroundColor: (color: string) => void;
  fillBackgroundColor: (color: string) => void;
}
