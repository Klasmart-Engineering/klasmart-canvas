import { IPermissions } from '../../../interfaces/permissions/permissions';
import {
  UPDATE_CLEAR_WHITEBOARD,
  UPDATE_DOWNLOAD_CANVAS,
  UPDATE_RECEIVED,
  UPDATE_ERASE,
  UPDATE_FLOOD_FILL,
  UPDATE_MOVE,
  UPDATE_PARTIAL_ERASE,
  UPDATE_PEN,
  UPDATE_POINTER,
  UPDATE_SHAPE,
  UPDATE_TEXT,
  UPDATE_UNDO_REDO,
  UPDATE_UPLOAD_IMAGE,
} from './actions';

/**
 * Default permissions state.
 */
const permissionsState: IPermissions = {
  pointer: false,
  move: false,
  erase: false,
  partialErase: false,
  pen: false,
  floodFill: false,
  text: false,
  shape: false,
  undoRedo: false,
  clearWhiteboard: false,
  downloadCanvas: false,
  uploadImage: false,
  backgroundColor: false,
  setUserInfoToDisplay: false,
}

/**
 * Reducer
 * @param state Redux state
 * @param action Action
 */
export function permissionsReducer(state: IPermissions = permissionsState, action: { type: string, payload: boolean | IPermissions }) {
  switch (action.type) {
    case UPDATE_POINTER: {
      return { ...state, pointer: action.payload };
    }
    case UPDATE_PEN: {
      return { ...state, pen: action.payload };
    }
    case UPDATE_SHAPE: {
      return { ...state, shape: action.payload };
    }
    case UPDATE_TEXT: {
      return { ...state, text: action.payload };
    }
    case UPDATE_UNDO_REDO: {
      return { ...state, undoRedo: action.payload };
    }
    case UPDATE_UPLOAD_IMAGE: {
      return { ...state, uploadImage: action.payload };
    }
    case UPDATE_PARTIAL_ERASE: {
      return { ...state, partialErase: action.payload };
    }
    case UPDATE_MOVE: {
      return { ...state, move: action.payload };
    }
    case UPDATE_CLEAR_WHITEBOARD: {
      return { ...state, clearWhiteboard: action.payload };
    }
    case UPDATE_DOWNLOAD_CANVAS: {
      return { ...state, downloadCanvas: action.payload };
    }
    case UPDATE_ERASE: {
      return { ...state, erase: action.payload };
    }
    case UPDATE_FLOOD_FILL: {
      return { ...state, floodFill: action.payload };
    }
    case UPDATE_RECEIVED: {
      return { ...state, ...action.payload as IPermissions };
    }
    default:
      return state
  }
}

