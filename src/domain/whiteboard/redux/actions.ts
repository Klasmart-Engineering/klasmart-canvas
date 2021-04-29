/**
 * Redux dispatch actions. Note, actions are directly named after permission properties to prevent
 * rewrites of multiple files.
 */
export const UPDATE_PEN = 'pen';
export const UPDATE_POINTER = 'pointer';
export const UPDATE_MOVE = 'move';
export const UPDATE_ERASE = 'erase';
export const UPDATE_PARTIAL_ERASE = 'partialErase';
export const UPDATE_FLOOD_FILL = 'floodFill';
export const UPDATE_TEXT = 'text';
export const UPDATE_SHAPE = 'shape';
export const UPDATE_UNDO_REDO = 'undoRedo';
export const UPDATE_CLEAR_WHITEBOARD = 'clearWhiteboard';
export const UPDATE_DOWNLOAD_CANVAS = 'downloadCanvas';
export const UPDATE_UPLOAD_IMAGE = 'uploadImage';
export const UPDATE_RECEIVED = 'updateReceived';
export const ADD_STAMP = 'addStamp';
export const UPDATE_USERS = 'updateUsers'
