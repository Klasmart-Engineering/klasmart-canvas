/**
 * Permissions interface.
 */
export interface IPermissions {
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
  downloadCanvas: boolean;
  uploadImage: boolean;
  backgroundColor: boolean;
  cursorPointer: boolean;
  shape3d: boolean
}
