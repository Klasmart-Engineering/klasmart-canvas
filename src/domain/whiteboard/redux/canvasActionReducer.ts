import { TypedShape } from "../../../interfaces/shapes/shapes";


const canvasBoardState = {
  resize: false,
  shape: null,
  startPoint: { x:0, y: 0 },
}

export function canvasBoardReducer(state: { resize: boolean; shape: TypedShape | null; startPoint: { x: number; y: number;} } = canvasBoardState, action: { type: string, payload?: any }) {
  switch(action.type) {
    case 'SET_FALSE': {
      return { ...state, resize: false };
    }
    case 'SET_TRUE': {
      return { ...state, resize: true };
    }
    case 'SET_SHAPE': {
      return { ...state, shape: action.payload}
    }
    case 'SET_SHAPE_NULL': {
      return { ...state, shape: null };
    }
    case 'SET_START_POINT': {
      return { ...state, startPoint: action.payload }
    }
    default:
      return state;
  }
}
